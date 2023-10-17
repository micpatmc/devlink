import * as admin from 'firebase-admin';
import { env } from './env';

// TODO: Replace the following with your app's Firebase project configuration
const serviceAccount = JSON.parse(env.SERVICE_ACCOUNT);
const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
};

const app = admin.initializeApp(firebaseConfig);

export const db = app.firestore();
