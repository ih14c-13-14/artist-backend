export type ArtDetailDTO = {
	'arts.id': string;
	'arts.name': string;
	'arts.address': string;
	'arts.image_path': string[];
	'arts.description': string;
	'arts.is_public': boolean;
	'arts.created_year': number;
	'arts.datetime_description': string;
	'arts.closed_day_description': string;
	'institutions.admission_fee_description': string;
	'authors.name': string;
	'authors.image_path': string;
	is_favorited: boolean; // Prettierでシングルコーテーション外れる
};
