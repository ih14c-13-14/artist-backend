export type ArtDTO = {
	'arts.id': string;
	'arts.name': string;
	'arts.address': string;
	'arts.image_path': string;
	'authors.name': string;
	is_favorited: boolean; // Prettierでシングルコーテーション外れる
};
