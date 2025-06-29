import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

// Generate a random token
export function generateRandomToken() {
  return randomBytes(20).toString('hex')
}

// Generate a random string based on an input value
// @ts-ignore
export function generateRandomString(inputValue) {
  return createHash('sha256').update(String(inputValue)).digest('hex')
}

// Hash a password using scrypt
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

// Compare a password with its hash using scrypt
export function comparePassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':')
  const derivedHash = scryptSync(password, salt, 64).toString('hex')
  // @ts-ignore
  return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derivedHash, 'hex'))
}

// A function to assess whether a user is admin based on the header value
export function isAdmin(request: Request) {
  const xAccessKey = request.headers.get('x-access-key')
  if (xAccessKey) return xAccessKey === process.env.PRIVATE_ACCESS_KEY
  return false
}