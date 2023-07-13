import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';

export class SignUpInput {
	// TODO: message考える
	@IsEmail(
		{},
		{
			message: 'メールアドレスの形式が正しくありません',
		},
	)
	@IsNotEmpty({
		message: 'メールアドレスを入力してください',
	})
	email: string;

	@IsString()
	@MinLength(8, {
		message: '8文字以上である必要があります。',
	})
	@MaxLength(32, {
		message: '32文字以下である必要があります。',
	})
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,32}$/, {
		// TODO: message考える
		message: '次の形式と一致する必要があります:',
	})
	@IsNotEmpty({
		message: 'パスワードを入力してください',
	})
	password: string;

	@IsNotEmpty({
		message: '年齢を選択してください',
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
