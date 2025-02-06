import type { NextApiRequest, NextApiResponse } from "next";
import { read } from "~/firebase/firebase";
import { CardItem } from "~/types";

const handler = async (req: NextApiRequest, res: NextApiResponse<CardItem | null>) => {
	const id = req.query.id?.toString().trim();
	if (req.method !== "GET" || !id || id === "null" || id === "undefined") {
		await new Promise((resolve) => setTimeout(resolve, 5000));
		return res.status(404).json(null);
	}
	const card = await read(id).then((r) => r.result);
	return res.status(200).json(card);
};

export default handler;
