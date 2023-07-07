export function convertGenderToNumber(gender: string): number {
	switch (gender) {
		case '男性':
			return 1;
		case '女性':
			return 2;
		case 'その他':
			return 9;
		default:
			throw new Error('性別が見つかりません');
	}
}
