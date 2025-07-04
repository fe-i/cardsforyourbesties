import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

let app;
if (getApps().length === 0) {
	app = initializeApp({
		apiKey: process.env.NEXT_PUBLIC_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_APP_ID
	});
} else {
	app = getApp();
}

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
