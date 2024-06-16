import { extendTheme } from "@chakra-ui/react";
import { Albert_Sans } from "next/font/google";

const albert_sans = Albert_Sans({
	style: ["normal", "italic"],
	subsets: ["latin"]
});

export const Theme = extendTheme({
	fonts: {
		body: albert_sans.style.fontFamily,
		heading: albert_sans.style.fontFamily,
		mono: albert_sans.style.fontFamily
	}
});
