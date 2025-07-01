import type { EmailProviderSendVerificationRequestParams, Provider } from '@auth/core/providers'
import Credentials from '@auth/core/providers/credentials'
import Google from '@auth/core/providers/google'
import Resend from '@auth/core/providers/resend'
import { getSecret } from 'astro:env/server'
import { defineConfig } from 'auth-astro'
import type { FullAuthConfig } from 'auth-astro/src/config'
import { v4 as uuidv4 } from 'uuid'
import { comparePassword, generateRandomString, hashPassword } from './src/lib/auth'
import { adapter, getPassword, setPassword } from './src/lib/db'
import { sendEmail } from './src/lib/email'

const AUTH_SECRET = getSecret('AUTH_SECRET')
// OAuth 2.0 Environment Variables
const GOOGLE_CLIENT_ID = getSecret('AUTH_GOOGLE_CLIENT_ID')
const GOOGLE_CLIENT_SECRET = getSecret('AUTH_GOOGLE_CLIENT_SECRET')

async function sendVerificationRequest(params: EmailProviderSendVerificationRequestParams) {
  const { identifier: to, provider, url } = params
  const res = await sendEmail(
    {
      from: provider.from || 'someone@seibert.group',
      to,
      subject: `Your sign in link`,
      text: `Hello,\n\nHere's your secure sign-in link for Seibert Media:\n${url}\n\nThis link will expire in 24 hours. If you didn't request this, you can safely ignore this email.\n\nThanks,\nSeibert Media`,
    },
  )
  if (!res.ok) 
    throw new Error(JSON.stringify(await res.json()))
}

const authConfig = (): FullAuthConfig => {
  const oauthArray: Provider[] = []
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
    oauthArray.push(
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: 'consent',
            response_type: 'code',
            access_type: 'offline',
          },
        },
      }),
    )
  } else console.warn('Google OAuth envrionment variables not found.')
  oauthArray.push(
    Resend({
      sendVerificationRequest: async (params) => await sendVerificationRequest(params),
    }),
  )
  return {
    adapter,
    session: {
      strategy: 'database',
      maxAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
      async encode({ token }) {
        return token?.sessionId as unknown as string
      },
    },
    secret: AUTH_SECRET,
    useSecureCookies: import.meta.env.PROD,
    providers: [
      ...oauthArray,
      Credentials({
        name: 'Credentials',
        credentials: {
          username: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, _) {
          if (typeof credentials?.username !== 'string') throw new Error('Username not found.')
          if (typeof credentials?.password !== 'string') throw new Error('Password not found.')
          
          // Add your own email validation logic
          const storedPassword = await getPassword(credentials.username)
          
          // Sign In
          if (storedPassword) {
            console.log('Signing In', credentials.username)
            // Generate a randomized password based on the user's input password
            const randomizedPassword = generateRandomString(credentials.password)
            // Compare the randomized password with the stored password
            const isPasswordCorrect = comparePassword(randomizedPassword, storedPassword)
            if (isPasswordCorrect) {
              const user_details = await adapter.getUserByEmail?.(credentials.username)
              if (!user_details?.id) return null
              // If the passwords match, create a session cookie for the user
              return { id: user_details.id, image: user_details.image, email: user_details.email, name: user_details.name }
            } else {
              console.log('Password did not match.')
              return null
            }
          } else {
            // Sign Up
            console.log('Signing Up', credentials.username)
            const randomizedPassword = generateRandomString(credentials.password)
            const hashedPassword = hashPassword(randomizedPassword)
            await setPassword(credentials.username, hashedPassword)
            await adapter.createUser?.({ id: uuidv4(), email: credentials.username, emailVerified: null })
            const user_details = await adapter.getUserByEmail?.(credentials.username)
            if (!user_details?.id) return null
            return { id: user_details.id, image: user_details.image, email: user_details.email, name: user_details.name }
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ account, user, token }) {
        if (account?.provider === 'credentials' && user.id) {
          console.log('Creating session for user:', user.email)
          const tmp = await adapter.createSession?.({ 
            sessionToken: uuidv4(), 
            userId: user.id, 
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) 
          })
          if (tmp?.sessionToken) {
            token.sessionId = tmp.sessionToken
            console.log('Session created successfully:', tmp.sessionToken)
          } else {
            console.error('Failed to create session')
          }
        }
        return token
      },
      async session({ session, token }) {
        console.log('Session callback - token:', token)
        console.log('Session callback - session:', session)
        return session
      },
    },
  }
}

export default defineConfig(authConfig())
