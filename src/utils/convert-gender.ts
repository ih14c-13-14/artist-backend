export const genderMapping: Record<string, number> = {
	男性: 1,
	女性: 2,
	その他: 9,
};

const convertNumberToGender = (genderNum: number): string | undefined => {
	const gender = Object.keys(genderMapping).find(
		(key) => genderMapping[key] === genderNum,
	);
	return gender;
};

const convertGenderToNumber = (gender: string): number | undefined => {
	return genderMapping[gender];
};

export { convertNumberToGender, convertGenderToNumber };
