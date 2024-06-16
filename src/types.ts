export interface CardItem {
	recipient?: string;
	sender?: string;
	message?: string;
	image?: string | File;
}

export interface CardTemplateItem {
	name: string;
	message?: string;
	image?: string | File;
}
