export type OtherChangePageChoices = {
	currentValues: {
		age_group: number;
		gender: number;
		prefecture: number;
	};
	age_groupChoices: {
		id: number;
		name: string;
	}[];
	prefectureChoices: {
		id: number;
		name: string;
	}[];
	genderChoices: {
		id: number;
		name: string;
	}[];
};
