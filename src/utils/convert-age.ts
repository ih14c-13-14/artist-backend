export const ageMapping: Record<string, number> = {
	'10代': 1,
	'20代': 2,
	'30代': 3,
	'40代': 4,
	'50代': 5,
	'60代': 6,
	'70代': 7,
	'80代': 8,
	'90代': 9,
};

const convertNumberToAge = (ageNum: number): string | undefined => {
	const age = Object.keys(ageMapping).find((key) => ageMapping[key] === ageNum);
	return age;
};

const convertAgeToNumber = (ageStr: string): number | undefined => {
	return ageMapping[ageStr];
};

export { convertAgeToNumber, convertNumberToAge };
