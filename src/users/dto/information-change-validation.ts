import { IsNotEmpty } from 'class-validator';

export class InformationChangeValidation {
	@IsNotEmpty({
		message: '年齢層を選択してください',
	})
	age_group: number;

	@IsNotEmpty({
		message: '性別を選択してください',
	})
	gender: number;

	@IsNotEmpty({
		message: '都道府県を選択してください',
	})
	prefecture: number;
}
