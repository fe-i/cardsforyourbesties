import { Flex, Image, Text } from "@chakra-ui/react";
import { CardItem } from "~/types";

const Card: React.FC<{ card: CardItem | null }> = ({ card }) => {
	if (!card) return <></>;

	const { recipient, sender, message, image } = card;

	return (
		<Flex
			flexDir="column"
			bg="white"
			borderRadius="xl"
			boxShadow="2xl"
			w={{ base: "90vw", md: "470px" }}
			px={6}
			py={6}>
			<Flex mx={-6} mt={-6} mb={6}>
				{image instanceof File ? (
					<Image borderTopRadius="xl" src={URL.createObjectURL(image)} alt="Image" />
				) : typeof image === "string" && image ? (
					<Image borderTopRadius="xl" src={image} fallbackSrc="/image.png" alt="Image" />
				) : (
					<Image borderTopRadius="xl" src="/image.png" alt="Fallback Image" />
				)}
			</Flex>
			<Text fontSize="sm" whiteSpace="pre-line">
				<Text as="span" fontWeight="bold">
					To:
				</Text>{" "}
				{recipient?.length ? recipient : "recipient"}
				<br />
				<Text as="span" fontWeight="bold">
					From:
				</Text>{" "}
				{sender?.length ? sender : "sender"}
			</Text>
			<br />
			<Text>{message?.length ? message : "your message here"}</Text>
		</Flex>
	);
};

export default Card;
