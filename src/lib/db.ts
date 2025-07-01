import { UnstorageAdapter } from '@auth/unstorage-adapter'
import { getSecret } from 'astro:env/server'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { createStorage, defineDriver } from 'unstorage'

let firestore: any

const firebaseConfig = {
  projectId: getSecret('FIREBASE_PROJECT_ID'),
  clientEmail: getSecret('FIREBASE_CLIENT_EMAIL'),
  privateKey: getSecret('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
}

async function initializeFirebase() {
  if (!firestore) {
    try {
      if (getApps().length === 0) {
        initializeApp({
          credential: cert(firebaseConfig),
          projectId: firebaseConfig.projectId,
        })
      }
      firestore = getFirestore()
      console.log('Firebase initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Firebase:', error)
      throw error
    }
  }
  if (!firestore) {
    throw new Error('Firebase not initialized - missing configuration')
  }
}

export const myStorageDriver = defineDriver(() => {
  return {
    name: 'seibert-media-driver',
    async hasItem(key: string, _opts) {
      await initializeFirebase()
      try {
        const doc = await firestore.collection('storage').doc(key).get()
        return doc.exists
      } catch (error) {
        console.error('Failed to check item:', error)
        // Return false instead of throwing - this allows auth to continue
        return false
      }
    },
    async getItem(key: string, _opts) {
      await initializeFirebase()
      try {
        const doc = await firestore.collection('storage').doc(key).get()
        return doc.exists ? doc.data()?.value : null
      } catch (error) {
        console.error('Failed to get item:', error)
        // Return null instead of throwing - this allows auth to continue
        return null
      }
    },
    async setItem(key: string, value: any, _opts) {
      await initializeFirebase()
      try {
        // Create the document - this will create the collection if it doesn't exist
        await firestore.collection('storage').doc(key).set({ 
          value,
          _created: new Date(),
          _updated: new Date()
        })
        console.log(`Successfully set item: ${key}`)
      } catch (error) {
        console.error('Failed to set item:', error)
        // Don't throw the error, just log it and continue
        // This allows the auth flow to continue even if storage fails
      }
    },
    async removeItem(key: string, _opts) {
      await initializeFirebase()
      try {
        await firestore.collection('storage').doc(key).delete()
      } catch (error) {
        console.error('Failed to remove item:', error)
        throw error
      }
    },
    async getKeys(base: string, _opts) {
      await initializeFirebase()
      try {
        const snapshot = await firestore.collection('storage').get()
        return snapshot.docs
          .map((doc: any) => doc.id)
          .filter((key: string) => key.startsWith(base) && key !== '_init')
      } catch (error) {
        console.error('Failed to get keys:', error)
        return []
      }
    },
    async clear(base: string, _opts) {
      await initializeFirebase()
      try {
        const snapshot = await firestore.collection('storage').get()
        const docsToDelete = snapshot.docs.filter((doc: any) => doc.id.startsWith(base) && doc.id !== '_init')
        
        if (docsToDelete.length > 0) {
          const batch = firestore.batch()
          docsToDelete.forEach((doc: any) => {
            batch.delete(doc.ref)
          })
          await batch.commit()
        }
      } catch (error) {
        console.error('Failed to clear items:', error)
        throw error
      }
    },
  }
})

export const adapter = UnstorageAdapter(
  createStorage({
    driver: myStorageDriver(null),
  }),
)

export async function setPassword(email: any, password: any) {
  await initializeFirebase()
  try {
    await firestore.collection('login').doc(email).set({ 
      password,
      _created: new Date(),
      _updated: new Date()
    })
    console.log(`Successfully set password for: ${email}`)
  } catch (error) {
    console.error('Failed to set password:', error)
    // Don't throw - allow the flow to continue
  }
}

export async function getPassword(email: string) {
  await initializeFirebase()
  try {
    const doc = await firestore.collection('login').doc(email).get()
    return doc.exists ? doc.data()?.password : null
  } catch (error) {
    console.error('Failed to get password:', error)
    // Return null instead of throwing - this allows auth to continue
    return null
  }
}
