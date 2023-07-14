const genderMapping: Readonly<Record<number, string>> = {
	1: '男性',
	2: '女性',
	9: 'その他',
};

const getAllGender = () => {
	return Object.entries(genderMapping).map(([id, name]) => ({
		id: Number(id),
		name,
	}));
};

const convertNumberToGender = (genderNum: number): string | undefined => {
	const gender = genderMapping[genderNum];
	return gender;
};

const convertGenderToNumber = (genderStr: string): number | undefined => {
	for (const key in genderMapping) {
		if (genderMapping[key] === genderStr) {
			return Number(key);
		}
	}
	return undefined;
};

export { getAllGender, convertNumberToGender, convertGenderToNumber };
