import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailValidation {
	@IsEmail({})
	@IsNotEmpty({
		message: 'メールアドレスを入力してください',
	})
	email: string;
}
