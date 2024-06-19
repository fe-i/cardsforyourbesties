import {
	collection,
	doc,
	addDoc,
	setDoc,
	getDoc,
	DocumentData,
	QueryDocumentSnapshot,
	SnapshotOptions,
	deleteDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CardItem } from "~/types";
import { v4 as uuidv4 } from "uuid";
import { firestore, storage } from "./config";

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
