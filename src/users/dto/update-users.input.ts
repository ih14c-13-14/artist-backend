import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUsersInput {
	@IsEmail({})
	@IsNotEmpty({
		message: 'メールアドレスを入力してください',
	})
	email: string;
}
