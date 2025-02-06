import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "~/components/card/card";
import Layout from "~/components/shared/layout";
import { CardItem } from "~/types";

const View: React.FC = () => {
	const { query } = useRouter();
	const [card, setCard] = useState<CardItem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (query.id) {
			fetch(`/api/firebase/read?id=${query.id}`)
				.then((res) => res.json())
				.then((data) => {
					setCard(data);
					setLoading(false);
				});
		}
	}, [query.id]);

	return (
		<Layout title="View Card">
			<Flex flexDir="column" align="center" justify="center" fontSize="lg" py={10}>
				{loading ? (
					<Flex flexDir="row" align="center" justify="center" gap={5}>
						<Spinner thickness="3px" size="xl" />
						<Text fontSize="3xl">Loading...</Text>
					</Flex>
				) : card ? (
					<Card card={card} />
				) : (
					<Text fontSize="3xl">Card Not Found</Text>
				)}
			</Flex>
		</Layout>
	);
};

export default View;
