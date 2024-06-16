import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Text,
	FormControl,
	FormLabel,
	InputGroup,
	Input,
	useToast,
	IconButton
} from "@chakra-ui/react";
import { Loader, ImagePlus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";

const ImagePicker: React.FC<{ isOpen: boolean; onClose: () => void; setImage: any }> = ({
	isOpen,
	onClose,
	setImage
}) => {
	const [loading, setLoading] = useState(false);

	const toastHook = useToast();
	const toast = useCallback(
		(description: string, status: any) => {
			if (!toastHook.isActive("toast"))
				toastHook({
					id: "toast",
					title: "Image Selector",
					description,
					status,
					duration: 4000,
					position: "top-right",
					isClosable: true
				});
		},
		[toastHook]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { "image/*": [] },
		maxFiles: 1,
		onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (!!fileRejections.length) return;
			setImage(acceptedFiles[0]);
			toast("Image added from upload!", "success");
		}
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		try {
			const blob = await fetch(e.target[0].value).then((response) => response.blob());
			if (!blob.type.startsWith("image/")) throw new Error("Not an image!");
			setImage(e.target[0].value);
			toast("Image added from URL!", "success");
		} catch (e) {
			toast("Error getting image from URL!", "error");
		}
		setLoading(false);
	};

	useEffect(() => {
		if (isOpen) {
			document.onpaste = (e) => {
				const items = e.clipboardData?.items;
				if (!items) return;

				const image = Array.from(items).find((item) => item.type.startsWith("image/"));
				if (!image) return;

				const file = image.getAsFile();
				setImage(file);
				toast("Image added from clipboard!", "success");
			};
		} else {
			document.onpaste = null;
		}
	}, [isOpen, setImage, toast]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered blockScrollOnMount>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody>
					<Tabs variant="line" isFitted>
						<TabList>
							<Tab>Upload Image</Tab>
							<Tab>Use Image URL</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<InputGroup
									justifyContent="center"
									borderWidth={2}
									borderRadius={10}
									borderStyle="dashed"
									p={16}
									_hover={{ cursor: "pointer" }}
									{...getRootProps()}>
									<input type="image" {...getInputProps()} />
									<Text textAlign="center">
										{isDragActive
											? "drop the image here"
											: "drop or paste the image here or click to upload an image"}
									</Text>
								</InputGroup>
							</TabPanel>
							<TabPanel>
								<form onSubmit={handleSubmit}>
									<FormControl justifyContent="center" py={16} isRequired>
										<FormLabel>Image URL</FormLabel>
										<InputGroup>
											<Input type="url" placeholder="https://example.com/image.png" />
											<IconButton
												type="submit"
												aria-label="Add/Modify Image"
												disabled={loading}
												variant="outline"
												icon={loading ? <Loader /> : <ImagePlus />}
												isLoading={loading}
												ml={1}
											/>
										</InputGroup>
									</FormControl>
								</form>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ImagePicker;
