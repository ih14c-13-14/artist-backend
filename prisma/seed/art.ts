import { PrismaClient } from '@prisma/client';
import { uuidv7 } from '@kripod/uuidv7';
const prisma = new PrismaClient();

import { AUTHOR_IDS } from './author';

export const ARTS_IDS = {
	art1Id: uuidv7(),
	art2Id: uuidv7(),
	art3Id: uuidv7(),
	art4Id: uuidv7(),
	art5Id: uuidv7(),
	art6Id: uuidv7(),
	art7Id: uuidv7(),
	art8Id: uuidv7(),
	art9Id: uuidv7(),
	art10Id: uuidv7(),
} as const;

export const art = async () => {
	await prisma.arts.createMany({
		data: [
			{
				id: ARTS_IDS.art1Id,
				is_public: true,
				name: 'アーティストの図書館',
				name_kana: 'あーてぃすとのとしょかん',
				created_year: 2023,
				description: 'アーティストの図書館の説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/11/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: '新潟県上越市本城町7-7',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author1Id,
			},
			{
				id: ARTS_IDS.art2Id,
				is_public: true,
				name: '赤クランブ',
				name_kana: 'あかくらんぶ',
				created_year: 2023,
				description: '赤クランブの説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/12/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: '新潟県上越市下門前446-2',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author2Id,
			},
			{
				id: ARTS_IDS.art3Id,
				is_public: true,
				name: 'イナゴナビタンゴ',
				name_kana: 'いなごなびたんご',
				created_year: 2023,
				description: 'イナゴナビタンゴの説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/5/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: '新潟県上越市春日山町1丁目2-8',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author3Id,
			},
			{
				id: ARTS_IDS.art4Id,
				is_public: true,
				name: 'うぶすなの家',
				name_kana: 'うぶすなのいえ',
				created_year: 2023,
				description: 'うぶすなの家の説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/5/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: '新潟県上越市清里区青柳3436-2',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author4Id,
			},
			{
				id: ARTS_IDS.art5Id,
				is_public: true,
				name: 'エラリエル',
				name_kana: 'えらりえる',
				created_year: 2023,
				description: 'エラリエルの説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/7/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: ' 新潟県上越市本城町7-1',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author5Id,
			},
			{
				id: ARTS_IDS.art6Id,
				is_public: true,
				name: 'オモイノハナシ',
				name_kana: 'おもいのはなし',
				created_year: 2023,
				description: 'オモイノハナシの説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/8/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: '新潟県上越市下池部1317-1',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author6Id,
			},
			{
				id: ARTS_IDS.art7Id,
				is_public: true,
				name: '黄金の魚',
				name_kana: 'おうごんのさかな',
				created_year: 2023,
				description: '黄金の魚の説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/9/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: '新潟県上越市本城町7-1',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author7Id,
			},
			{
				id: ARTS_IDS.art8Id,
				is_public: true,
				name: '上卿の館',
				name_kana: 'じょうきょうのやかた',
				created_year: 2023,
				description: '上卿の館の説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/10/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: '新潟県上越市頸城区鵜ノ木148番地',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author8Id,
			},
			{
				id: ARTS_IDS.art9Id,
				is_public: true,
				name: 'まつだい雪国文化センター',
				name_kana: 'まつだいゆきぐにぶんかセンター',
				created_year: 2023,
				description: 'まつだい雪国文化センターの説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/11/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: '新潟県上越市中央4丁目16-10',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author9Id,
			},
			{
				id: ARTS_IDS.art10Id,
				is_public: true,
				name: 'ミュージアム・オブ・スノー',
				name_kana: 'みゅーじあむおぶすのー',
				created_year: 2023,
				description: 'ミュージアム・オブ・スノーの説明',
				image_path: 'https://placehold.jp/150x150.png',
				datetime_description:
					'2023/4/1（金）～2023/12/30（土）(祝日を除く火水定休)日中',
				closed_day_description:
					'祝日を除く火水定休（定休日も野外作品は鑑賞可）',
				address: ' 新潟県上越市大潟区四ツ屋浜580番地1',
				created_at: new Date(),
				author_id: AUTHOR_IDS.author10Id,
			},
		],
	});
};
