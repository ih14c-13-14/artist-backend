export type artDetailServiceResponse = {
	id: string;
	name: string;
	address: string;
	image_path: string[];
	description: string;
	is_public: boolean;
	created_year: number;
	datetime_description: string;
	closed_day_description: string;
	arts_institutions: {
		institution: {
			admission_fee_description: string;
		};
	}[];
	authors: {
		name: string;
		image_path: string;
	};
	arts_users: Array<{ art_id: string }> | [];
};
