import { uuidv7 } from '@kripod/uuidv7';
import { Arts } from '@prisma/client';

export const ART_COMMON_DATA = (() => {
	const date = new Date();
	return [
		{
			is_public: true,
			name: 'アーティストの図書館',
			name_kana: 'あーてぃすとのとしょかん',
			created_year: 2023,
			description: 'アーティストの図書館の説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/11/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: '新潟県上越市本城町7-7',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: '赤クランブ',
			name_kana: 'あかくらんぶ',
			created_year: 2023,
			description: '赤クランブの説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/12/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: '新潟県上越市下門前446-2',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: 'イナゴナビタンゴ',
			name_kana: 'いなごなびたんご',
			created_year: 2023,
			description: 'イナゴナビタンゴの説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/5/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: '新潟県上越市春日山町1丁目2-8',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: 'うぶすなの家',
			name_kana: 'うぶすなのいえ',
			created_year: 2023,
			description: 'うぶすなの家の説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/5/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: '新潟県上越市清里区青柳3436-2',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: 'エラリエル',
			name_kana: 'えらりえる',
			created_year: 2023,
			description: 'エラリエルの説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/7/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: ' 新潟県上越市本城町7-1',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: 'オモイノハナシ',
			name_kana: 'おもいのはなし',
			created_year: 2023,
			description: 'オモイノハナシの説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/8/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: '新潟県上越市下池部1317-1',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: '黄金の魚',
			name_kana: 'おうごんのさかな',
			created_year: 2023,
			description: '黄金の魚の説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/9/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: '新潟県上越市本城町7-1',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: '上卿の館',
			name_kana: 'じょうきょうのやかた',
			created_year: 2023,
			description: '上卿の館の説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/10/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: '新潟県上越市頸城区鵜ノ木148番地',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: 'まつだい雪国文化センター',
			name_kana: 'まつだいゆきぐにぶんかセンター',
			created_year: 2023,
			description: 'まつだい雪国文化センターの説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/11/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: '新潟県上越市中央4丁目16-10',
			created_at: date,
			updated_at: date,
		},
		{
			is_public: true,
			name: 'ミュージアム・オブ・スノー',
			name_kana: 'みゅーじあむおぶすのー',
			created_year: 2023,
			description: 'ミュージアム・オブ・スノーの説明',
			image_path: ['https://placehold.jp/150x150.png'],
			datetime_description:
				'2023/4/1（金）～2023/12/30（土）(祝日を除く火水定休)日中',
			closed_day_description: '祝日を除く火水定休（定休日も野外作品は鑑賞可）',
			address: ' 新潟県上越市大潟区四ツ屋浜580番地1',
			created_at: date,
			updated_at: date,
		},
	];
})() satisfies Array<Omit<Arts, 'id' | 'author_id'>>;

// UUIDv7の配列
export const ART_IDS: ReadonlyArray<string> = Array(ART_COMMON_DATA.length).map(
	() => uuidv7(),
);
