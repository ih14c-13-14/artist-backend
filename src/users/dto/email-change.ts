import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailChange {
	@IsEmail({})
	@IsNotEmpty({
		message: 'メールアドレスがありません',
	})
	email: string;

	@IsNotEmpty({
		message: 'tokenがありません',
	})
	token: string;
}
