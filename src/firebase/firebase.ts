import { getApp, getApps, initializeApp } from "firebase/app";
import {
	collection,
	doc,
	addDoc,
	setDoc,
	getDoc,
	DocumentData,
	QueryDocumentSnapshot,
	SnapshotOptions,
	deleteDoc,
	getFirestore
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { CardItem } from "~/types";
import { v4 as uuidv4 } from "uuid";

let app;
if (getApps().length === 0) {
	app = initializeApp({
		apiKey: process.env.API_KEY,
		authDomain: process.env.AUTH_DOMAIN,
		projectId: process.env.PROJECT_ID,
		storageBucket: process.env.STORAGE_BUCKET,
		messagingSenderId: process.env.MESSAGING_SENDER_ID,
		appId: process.env.APP_ID
	});
} else {
	app = getApp();
}

const firestore = getFirestore(app);
const storage = getStorage();
const db = collection(firestore, "cards");

const write = async (data: CardItem, id?: string) => {
	let result, error;

	try {
		if (id) {
			result = await setDoc(doc(db, id), data);
		} else {
			result = await addDoc(db, data);
		}
	} catch (e) {
		error = e;
	}

	return { result, error };
};

const read = async (id: string) => {
	const docRef = doc(db, id).withConverter(dataConverter);
	let result, error;

	try {
		result = await getDoc(docRef);
	} catch (e) {
		error = e;
	}

	const data = result?.data();

	return { result: data ? data : null, error };
};

const dataConverter = {
	toFirestore: (data: CardItem): DocumentData => {
		let result: DocumentData = {
			recipient: data.recipient,
			sender: data.sender,
			message: data.message,
			image: data.image
		};
		return result;
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
		const data = snapshot.data(options);
		let result = {
			recipient: data.recipient,
			sender: data.sender,
			message: data.message,
			image: data.image
		} as CardItem;
		return result;
	}
};

const upload = async (image: File) => {
	const storageRef = ref(storage, uuidv4());
	const storageSnap = await uploadBytes(storageRef, image);
	return await getDownloadURL(storageSnap.ref);
};

const _delete = async (id: string) => {
	let result, error;

	try {
		result = await deleteDoc(doc(db, id));
	} catch (e) {
		error = e;
	}

	return { result, error };
};

export { write, upload, read, _delete };
