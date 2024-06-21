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
			<Flex mx={-6} mt={-6} mb={6} justify="center">
				{image instanceof File ? (
					<Image borderTopRadius="xl" src={URL.createObjectURL(image)} alt="Image" />
				) : typeof image === "string" && image ? (
					<Image borderTopRadius="xl" src={image} fallbackSrc="/image.png" alt="Image" />
				) : (
					<Image borderTopRadius="xl" src="/image.png" alt="Fallback Image" />
				)}
			</Flex>
			<Flex flexDir="column" fontSize="md">
				<Text fontWeight="bold">
					To:{" "}
					<Text as="span" fontWeight="normal">
						{recipient?.length ? recipient : "recipient"}
					</Text>
				</Text>
				<Text fontWeight="bold">
					From:{" "}
					<Text as="span" fontWeight="normal">
						{sender?.length ? sender : "sender"}
					</Text>
				</Text>
			</Flex>
			<br />
			<Text whiteSpace="pre-line">{message?.length ? message : "your message here"}</Text>
		</Flex>
	);
};

export default Card;
