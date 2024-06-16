import {
	Flex,
	Heading,
	IconButton,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text
} from "@chakra-ui/react";
import { CircleHelp, SquarePen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { pathname } = useRouter();

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Cards For Your Besties</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Create and send custom digital cards to anyone for any occasion.</Text>
					</ModalBody>
					<ModalFooter>
						<Text>
							Made with love by{" "}
							<Text
								as={Link}
								href="https://github.com/fe-i/cardsforyourbesties"
								color="blue.400"
								target="_blank"
								_hover={{ color: "blue.500" }}>
								@fe-i
							</Text>
						</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Flex alignItems="center" justifyContent="space-between" px={5} py={2} shadow="md">
				<Link href="/">
					<Flex gap={2} alignItems="center">
						<Image w={12} alt="Logo" src="/mail.png" />
						<Heading bgGradient="linear(to-r, green.300, green.400)" backgroundClip="text">
							CFYB
						</Heading>
					</Flex>
				</Link>
				<Flex gap={2} alignItems="center">
					<IconButton variant="outline" aria-label="Info" icon={<CircleHelp />} onClick={onOpen} />
					{pathname !== "/create" && (
						<IconButton
							as={Link}
							variant="outline"
							aria-label="Create Card"
							icon={<SquarePen />}
							href="/create"
						/>
					)}
				</Flex>
			</Flex>
		</>
	);
};

export default Header;
