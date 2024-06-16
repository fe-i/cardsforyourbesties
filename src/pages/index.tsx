import Layout from "~/components/shared/layout";
import { Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const Home: React.FC = () => {
	return (
		<Layout>
			<Heading fontWeight="bold" fontSize={{ base: "5xl", md: "6xl" }} textAlign="center">
				Card making{" "}
				<Text as="span" color="green.400">
					made easy💌
				</Text>
			</Heading>
			<Text color="gray.500" fontSize="lg" textAlign="center" px={10}>
				Create and send your BFFs a personalized card for any occasion!
			</Text>
			<Button as={Link} href="/create" title="Card Builder" colorScheme="green">
				Get Started
			</Button>
		</Layout>
	);
};

export default Home;
