import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Theme } from "~/components/shared/theme";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={Theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
};

export default App;
