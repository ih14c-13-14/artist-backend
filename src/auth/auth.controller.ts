import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
	HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup.input';
import { paths } from '@/generated/schema';
import { SignInInput } from './dto/signin.input';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('signup')
	async signUp(@Body() signUpInput: SignUpInput): Promise<object> {
		const user = await this.authService.getUser(signUpInput.email);
		/**
		 * emailがすでに登録されている場合の処理
		 * @throws {paths["/api/v1/auth/signup"]["post"]["responses"]["400"]}
		 */
		if (user)
			throw new HttpException(
				{
					type: 'validation',
					message: [
						{
							property: 'email',
							message: 'このメールアドレスはすでに登録されています',
						},
					],
				} satisfies paths['/api/v1/auth/signup']['post']['responses']['400']['content']['application/json'],
				HttpStatus.BAD_REQUEST,
			);

		const newUser = await this.authService.signUp(signUpInput);

		/**
		 * ユーザー登録に失敗した場合の処理
		 * @throws {paths["/api/v1/auth/signup"]["post"]["responses"]["500"]}
		 */
		if (!newUser)
			throw new HttpException(
				{
					message: '会員登録に失敗しました',
				} satisfies paths['/api/v1/auth/signup']['post']['responses']['500']['content']['application/json'],
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		// TODO: JWTを返す。一旦文字列で#106で対応
		return {
			access_token: '会員登録が完了しました',
		} satisfies paths['/api/v1/auth/signup']['post']['responses']['200']['content']['application/json'];
	}

	/**
	 * ログイン処理
	 * @param signInInput  ログイン情報
	 * @returns {object}   JWTトークン
	 */
	@HttpCode(200)
	@Post('signin')
	async signIn(
		@Body() signInInput: SignInInput,
	): Promise<{ access_token: string }> {
		const { email, password } = signInInput;

		const user = await this.authService.validateUser(email, password);

		/**
		 * emailまたはpasswordが間違っている場合の処理
		 * @throws {paths["/api/v1/auth/signin"]["post"]["responses"]["401"]}
		 */
		if (!user) {
			throw new HttpException(
				{
					message: 'メールアドレスまたはパスワードが間違っています',
				} satisfies paths['/api/v1/auth/signin']['post']['responses']['401']['content']['application/json'],
				HttpStatus.UNAUTHORIZED,
			);
		}

		const accessToken = await this.authService.signIn(user);

		return {
			access_token: accessToken,
		} satisfies paths['/api/v1/auth/signin']['post']['responses']['200']['content']['application/json'];
	}
}
