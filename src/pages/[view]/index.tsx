import { Flex, Text, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "~/components/card/card";
import Layout from "~/components/shared/layout";
import { read } from "~/firebase/firebase";
import { CardItem } from "~/types";

const View: React.FC = () => {
	const { query } = useRouter();
	const [card, setCard] = useState<CardItem | null | undefined>(undefined);

	useEffect(() => {
		if (query.id) read(query.id.toString()).then((r) => setCard(r.result));
	}, [query]);

	return (
		<Layout title="View Card">
			<Flex flexDir="column" align="center" justify="center" fontSize="lg" py={10}>
				{card ? (
					<Card card={card} />
				) : card === null ? (
					<Text fontSize="3xl">Card Not Found</Text>
				) : (
					<Flex flexDir="row" align="center" justify="center" gap={5}>
						<Spinner thickness="3px" size="xl" />
						<Text fontSize="3xl">Loading...</Text>
					</Flex>
				)}
			</Flex>
		</Layout>
	);
};

export default View;
