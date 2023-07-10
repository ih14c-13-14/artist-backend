import {
	IsEmail,
	IsNotEmpty,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';

export class SignInInput {
	@IsEmail(
		{},
		{
			message: 'メールアドレスまたはパスワードが間違っています',
		},
	)
	@IsNotEmpty({
		message: 'メールアドレスを入力してください',
	})
	email: string;

	// TODO: 	@IsString()が必要か検討
	@MinLength(8, {
		message: 'メールアドレスまたはパスワードが間違っています',
	})
	@MaxLength(32, {
		message: 'メールアドレスまたはパスワードが間違っています',
	})
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,32}$/, {
		message: 'メールアドレスまたはパスワードが間違っています',
	})
	@IsNotEmpty({
		message: 'パスワードを入力してください',
	})
	password: string;
}
