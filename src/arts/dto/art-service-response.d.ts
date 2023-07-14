export type ArtServiceResponse = {
	id: string;
	name: string;
	address: string;
	image_path: string[];
	authors: {
		name: string;
	};
	arts_users: Array<{ art_id: string }> | [];
};
