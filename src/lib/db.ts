import { UnstorageAdapter } from '@auth/unstorage-adapter'
import { getSecret } from 'astro:env/server'
import * as Firestore from 'fireworkers'
import { createStorage, defineDriver } from 'unstorage'

let firestore: Firestore.DB

const firebaseConfig = {
  project_id: getSecret('FIREBASE_PROJECT_ID'),
  client_email: getSecret('FIREBASE_CLIENT_EMAIL'),
  private_key: getSecret('FIREBASE_PRIVATE_KEY'),
  private_key_id: getSecret('FIREBASE_PRIVATE_KEY_ID'),
}

async function initializeFirebase() {
  if (firebaseConfig.project_id && firebaseConfig.client_email && firebaseConfig.private_key && firebaseConfig.private_key_id) {
    firestore = await Firestore.init({
      uid: 'user1234',
      project_id: firebaseConfig.project_id,
      client_email: firebaseConfig.client_email,
      private_key: firebaseConfig.private_key,
      private_key_id: firebaseConfig.private_key_id,
    })
  }
}

export const myStorageDriver = defineDriver(() => {
  return {
    name: 'seibert-media-driver',
    async hasItem(key: string, _opts) {
      await initializeFirebase()
      return await Firestore.get(firestore, 'storage', key)
        .then(() => true)
        .catch(() => false)
    },
    async getItem(key: string, _opts) {
      await initializeFirebase()
      return await Firestore.get(firestore, 'storage', key)
        .then((doc) => doc.fields.value)
        .catch(() => null)
    },
    async setItem(key: string, value: any, _opts) {
      await initializeFirebase()
      await Firestore.set(firestore, 'storage', key, { value }, { merge: true })
    },
    async removeItem(key: string, _opts) {
      await initializeFirebase()
      await Firestore.remove(firestore, 'storage', key)
    },
    async getKeys(base: string, _opts) {
      await initializeFirebase()
      await Firestore.query(firestore, {
        from: [{ collectionId: 'storage' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'key' },
            op: 'GREATER_THAN_OR_EQUAL',
            value: { stringValue: base },
          },
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: 'key' },
                  op: 'LESS_THAN',
                  value: { stringValue: base + '\uf8ff' },
                },
              },
            ],
          },
        },
      })
    },
    async clear(base: string, _opts) {
      await initializeFirebase()
      const snapshot = await Firestore.query(firestore, {
        from: [{ collectionId: 'storage' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'key' },
            op: 'GREATER_THAN_OR_EQUAL',
            value: { stringValue: base },
          },
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: 'key' },
                  op: 'LESS_THAN',
                  value: { stringValue: base + '\uf8ff' },
                },
              },
            ],
          },
        },
      })
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
  return await Firestore.set(firestore, 'login', email, { password }, { merge: true })
}

export async function getPassword(email: string) {
  await initializeFirebase()
  return await Firestore.get(firestore, 'login', email)
    .then((doc) => doc.fields.password)
    .catch(() => null)
}
