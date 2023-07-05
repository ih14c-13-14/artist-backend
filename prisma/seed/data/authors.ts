import { uuidv7 } from '@kripod/uuidv7';

export const AUTHOR_COMMON_DATA = (() => {
	const now = new Date();
	return [
		{
			name: 'アルバルダム・エステル',
			name_kana: 'あるばるだむ・えすてる',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: '東春秋',
			name_kana: 'あづまはるあき',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: '井上真理子',
			name_kana: 'いのうえまりこ',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: '上原多香子',
			name_kana: 'うえはらたかこ',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: 'エステル・アルバルダム',
			name_kana: 'えすてる・あるばるだむ',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: '岡本真里',
			name_kana: 'おかもとまり',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: '奥本大海',
			name_kana: 'おくもとたいかい',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: 'EAT&AT TARO',
			name_kana: 'いーとあんどあっとたろう',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: 'MVRD',
			name_kana: 'えむぶいあーるでぃー',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
		{
			name: 'OHスタジオ',
			name_kana: 'おーえいちすたじお',
			image_path: 'https://placehold.jp/150x150.png',
			created_at: now,
		},
	] as const;
})();

export const AUTHOR_IDS: ReadonlyArray<string> = Array(
	AUTHOR_COMMON_DATA.length,
)
	.fill('')
	.map(() => uuidv7());
