export function convertAgeGroupToNumber(age_group: string): number {
	switch (age_group) {
		case '10代':
			return 1;
		case '20代':
			return 2;
		case '30代':
			return 3;
		case '40代':
			return 4;
		case '50代':
			return 5;
		case '60代':
			return 6;
		case '70代':
			return 7;
		case '80代':
			return 8;
		case '90代':
			return 9;
		default:
			throw new Error('年齢層が見つかりません');
	}
}
