import { Box, Flex } from "@chakra-ui/react";
import Metadata from "./metadata";
import Header from "./header";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
	return (
		<>
			<Metadata title={title} />
			<Flex flexDir="column">
				<Header />
				<Flex flexDir="column" minH="85vh" justify="center" align="center" gap={4} my={2}>
					<Box as="svg" position="fixed" left={0} top={0} zIndex={-10} h="100%" w="100%">
						<filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
							<feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="10" />
							<feDiffuseLighting lightingColor="#EFEFEF" surfaceScale="1.5">
								<feDistantLight azimuth="60" elevation="65" />
							</feDiffuseLighting>
						</filter>
						<rect width="100%" height="100%" filter="url(#roughpaper)" />
					</Box>
					{children}
				</Flex>
			</Flex>
		</>
	);
};

export default Layout;
