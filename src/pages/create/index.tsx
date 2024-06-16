import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Card from "~/components/card/card";
import CreateForm from "~/components/card/createForm";
import Layout from "~/components/shared/layout";
import { CardItem } from "~/types";

const Create: React.FC = () => {
	const [card, setCard] = useState<CardItem | null>({});

	return (
		<Layout title="Create a Card">
			<Flex justify="space-between" gap={10} flexDir={{ base: "column", lg: "row" }} align="center">
				<CreateForm card={card} setCard={setCard} />
				<Card card={card} />
			</Flex>
		</Layout>
	);
};

export default Create;
