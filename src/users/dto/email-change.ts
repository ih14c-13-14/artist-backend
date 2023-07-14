import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailChange {
	@IsEmail(
		{},
		{
			message: 'メールアドレスの形式が正しくありません',
		},
	)
	@IsNotEmpty({
		message: 'メールアドレスがありません',
	})
	email: string;

	@IsNotEmpty({
		message: 'tokenがありません',
	})
	token: string;
}
