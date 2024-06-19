import { Flex, Text } from "@chakra-ui/react";
import {
	type GetServerSideProps,
	type InferGetServerSidePropsType,
	type GetServerSidePropsContext
} from "next";
import Card from "~/components/card/card";
import Layout from "~/components/shared/layout";
import { read } from "~/firebase/firebase";
import { CardItem } from "~/types";

const View: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ card }) => {
	return (
		<Layout title="View Card">
			<Flex flexDir="column" align="center" justify="center" fontSize="lg" py={10}>
				{card ? <Card card={card} /> : <Text fontSize="3xl">Card Not Found</Text>}
			</Flex>
		</Layout>
	);
};

export default View;

export const getServerSideProps: GetServerSideProps<{ card: CardItem | null }> = async (
	context: GetServerSidePropsContext
) => {
	const { query } = context;
	const id = (query.id as string).trim();
	const card = await read(id).then((r) => r.result);

	return {
		props: { card }
	};
};
