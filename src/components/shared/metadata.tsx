import Head from "next/head";

const Metadata: React.FC<{ title?: string }> = ({ title }) => {
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />

			<title>{title ? title + " - CFYB" : "Cards For Your Besties"}</title>
			<meta name="title" content={title ? title + " - CFYB" : "Cards For Your Besties"} />
			<meta property="thumbnail" content="/mail.png" />
			<meta property="og:title" content={title ? title + " - CFYB" : "Cards For Your Besties"} />
			<meta
				property="og:description"
				content="Make and send custom digital cards to your besties for any occasion!"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:url" content="" />
			<meta property="og:image" content="/mail.png" />
			<meta
				property="twitter:title"
				content={title ? title + " - CFYB" : "Cards For Your Besties"}
			/>
			<meta
				property="twitter:description"
				content="Make and send custom digital cards to your besties for any occasion!"
			/>
			<meta property="twitter:image" content="/mail.png" />
		</Head>
	);
};

export default Metadata;
