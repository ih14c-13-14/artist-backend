import { PrismaClient } from '@prisma/client';
import { uuidv7 } from '@kripod/uuidv7';

const prisma = new PrismaClient();

export const author1Id = uuidv7();
export const author2Id = uuidv7();
export const author3Id = uuidv7();
export const author4Id = uuidv7();
export const author5Id = uuidv7();
export const author6Id = uuidv7();
export const author7Id = uuidv7();
export const author8Id = uuidv7();
export const author9Id = uuidv7();
export const author10Id = uuidv7();

export const author = async () => {
	const now = new Date();
	// authors.seed.tsで生成されたUUIDをエクスポートする
	await prisma.authors.createMany({
		data: [
			{
				id: author1Id,
				name: 'アルバルダム・エステル',
				name_kana: 'あるばるだむ・えすてる',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author2Id,
				name: '東春秋',
				name_kana: 'あづまはるあき',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author3Id,
				name: '井上真理子',
				name_kana: 'いのうえまりこ',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author4Id,
				name: '上原多香子',
				name_kana: 'うえはらたかこ',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author5Id,
				name: 'エステル・アルバルダム',
				name_kana: 'えすてる・あるばるだむ',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author6Id,
				name: '岡本真里',
				name_kana: 'おかもとまり',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author7Id,
				name: '奥本大海',
				name_kana: 'おくもとたいかい',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author8Id,
				name: 'EAT&AT TARO',
				name_kana: 'いーとあんどあっとたろう',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author9Id,
				name: 'MVRD',
				name_kana: 'えむぶいあーるでぃー',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
			{
				id: author10Id,
				name: 'OHスタジオ',
				name_kana: 'おーえいちすたじお',
				image_path: 'https://placehold.jp/150x150.png',
				created_at: now,
			},
		],
	});
};
