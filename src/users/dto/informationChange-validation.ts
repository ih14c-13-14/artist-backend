import { IsNotEmpty } from 'class-validator';

export class InformationChangeValidation {
	@IsNotEmpty()
	age_group: string;

	@IsNotEmpty()
	gender: string;

	@IsNotEmpty()
	prefecture: string;
}
