const ageMapping: Readonly<Record<number, string>> = {
	1: '10代',
	2: '20代',
	3: '30代',
	4: '40代',
	5: '50代',
	6: '60代',
	7: '70代',
	8: '80代',
	9: '90代',
};

const getAllAge = () => {
	return Object.entries(ageMapping).map(([id, name]) => ({
		id: Number(id),
		name,
	}));
};

const convertNumberToAge = (ageNum: number): string | undefined => {
	const age = ageMapping[ageNum];
	return age;
};

const convertAgeToNumber = (ageStr: string): number | undefined => {
	for (const key in ageMapping) {
		if (ageMapping[key] === ageStr) {
			return Number(key);
		}
	}
	return undefined;
};

export { getAllAge, convertAgeToNumber, convertNumberToAge };
