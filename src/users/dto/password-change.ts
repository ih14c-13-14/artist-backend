import {
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';

export class PasswordChange {
	@IsNotEmpty()
	@IsString()
	@MinLength(8, {
		message: '8文字以上である必要があります。',
	})
	@MaxLength(32, {
		message: '32文字以下である必要があります。',
	})
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,32}$/, {
		message: '次の形式と一致する必要があります:',
	})
	password: string;

	@IsNotEmpty({
		message: 'tokenがありません',
	})
	token: string;
}
