import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	IconButton,
	Input,
	Select,
	Text,
	Textarea,
	useDisclosure,
	useToast
} from "@chakra-ui/react";
import { ImagePlus, Images, MailPlus } from "lucide-react";
import { useState } from "react";
import { CardItem, CardTemplateItem } from "~/types";
import { useRouter } from "next/router";
import ImagePicker from "./imagePicker";
import { upload, write } from "~/firebase/firebase";

const templates: CardTemplateItem[] = [
	{
		name: "none"
	},
	{
		name: "birthday 🎂",
		message: "Wish you the happiest and sweetest birthday!",
		image:
			"https://hips.hearstapps.com/hmg-prod/images/birthday-cake-with-happy-birthday-banner-royalty-free-image-1656616811.jpg"
	},
	{
		name: "christmas 🎄",
		message:
			"Happy holidays! May the holiday season bring you joy and prosperity throughout the coming year.",
		image: "https://wallpaperaccess.com/full/788495.jpg"
	},
	{
		name: "graduation 🎓",
		message: "Congratulations on your graduation! Wishing you the best in your future endeavors!",
		image:
			"https://media.istockphoto.com/id/1465981922/vector/art-illustration.jpg?s=612x612&w=0&k=20&c=dESKPeZk9hCpTxFAc3veJh2njJVVmDneS4-sO1vE2QQ="
	}
];

const CreateForm: React.FC<{
	card: CardItem | null;
	setCard: React.Dispatch<React.SetStateAction<CardItem | null>>;
}> = ({ card, setCard }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = useState(false);
	const { push } = useRouter();

	const toastHook = useToast();
	const toast = (description: string, status: any) => {
		if (!toastHook.isActive("toast"))
			toastHook({
				id: "toast",
				title: "Card Builder",
				description,
				status,
				duration: 4000,
				position: "top-right",
				isClosable: true
			});
	};

	if (!card) return <></>;

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setLoading(true);

		let url;
		if (card.image instanceof File) {
			try {
				url = await upload(card.image);
			} catch (e) {
				toast("Unable to upload image! Try again later.", "error");
				setLoading(false);
				return;
			}
		} else if (typeof card.image === "string" && card.image) url = card.image;
		else {
			toast("Please provide an image!", "error");
			setLoading(false);
			return;
		}

		const { result, error } = await write({ ...card, image: url });
		if (error) toast("Unable to create card!", "error");
		else if (result && result.id) {
			await push(`/view?id=${result.id}`).then(() => toast("Created successfully!", "success"));
			return;
		} else toast("Unable to create card!", "error");
		setLoading(false);
	};

	return (
		<>
			<ImagePicker
				isOpen={isOpen}
				onClose={onClose}
				setImage={(image: string | File) => setCard({ ...card, image })}
			/>
			<Flex
				flexDir="column"
				borderRadius="xl"
				shadow="2xl"
				bg="white"
				w={{ base: "90vw", md: "470px" }}
				gap={2}
				p={6}>
				<Heading pb={2}>Card Builder</Heading>
				<form onSubmit={handleSubmit}>
					<Flex flexDir="column" gap={2}>
						<FormControl>
							<FormLabel>Template</FormLabel>
							<Select
								onChange={(e) => {
									const template = templates.find((t) => t.name === e.target.value);
									if (!template || template.name === "none") {
										setCard({ ...card, message: "", image: "" });
										return;
									}
									setCard({ ...card, message: template.message, image: template.image });
								}}>
								{templates.map((_, i) => (
									<option key={i} value={_.name}>
										{_.name}
									</option>
								))}
							</Select>
						</FormControl>
						<Flex gap={4}>
							<FormControl isInvalid={card.recipient !== undefined && !card.recipient} isRequired>
								<FormLabel>To</FormLabel>
								<Input
									placeholder="recipient"
									maxLength={32}
									onChange={(e) => setCard({ ...card, recipient: e.target.value })}
									value={card.recipient}
								/>
								<FormErrorMessage>Enter a valid recipient name.</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={card.sender !== undefined && !card.sender} isRequired>
								<FormLabel>From</FormLabel>
								<Input
									placeholder="sender"
									maxLength={32}
									onChange={(e) => setCard({ ...card, sender: e.target.value })}
									value={card.sender}
								/>
								<FormErrorMessage>Enter a valid sender name.</FormErrorMessage>
							</FormControl>
						</Flex>
						<FormControl isInvalid={card.message !== undefined && !card.message} isRequired>
							<FormLabel>Message</FormLabel>
							<Textarea
								placeholder="your message here"
								resize="none"
								h="20vh"
								maxLength={500}
								onChange={(e) => setCard({ ...card, message: e.target.value })}
								value={card.message}
							/>
							<FormErrorMessage>Enter a valid message.</FormErrorMessage>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Image</FormLabel>
							<Flex
								align="center"
								justify="space-between"
								borderWidth={card.image !== undefined && !card.image ? 2 : 1}
								borderColor={card.image !== undefined && !card.image ? "red.500" : "gray.200"}
								borderRadius="md"
								h="50px"
								pl={4}
								pr={1}>
								<Text textColor="gray.500" fontSize="md" overflow="hidden">
									{card.image ? "image selected" : "no image selected"}
								</Text>
								<IconButton
									aria-label="Add/Modify Image"
									rounded="full"
									variant="ghost"
									onClick={onOpen}
									icon={
										card.image ? (
											typeof card.image !== "string" ? (
												<Images />
											) : (
												<Images />
											)
										) : (
											<ImagePlus />
										)
									}
								/>
							</Flex>
							{card.image !== undefined && !card.image && (
								<FormHelperText color="red.500">Include a valid image.</FormHelperText>
							)}
						</FormControl>
						<Button
							type="submit"
							leftIcon={<MailPlus />}
							isLoading={loading}
							loadingText="Loading"
							spinnerPlacement="start"
							mt={2}>
							Create Card
						</Button>
					</Flex>
				</form>
			</Flex>
		</>
	);
};

export default CreateForm;
