import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '@prisma/client';
import { SignUpInput } from './dto/signup.input';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signUp(@Body() signUpInput: SignUpInput): Promise<Users> {
		const user = await this.authService.getUser(signUpInput.email);
		if (user)
			throw new HttpException(
				{
					message: 'このメールアドレスはすでに登録されています',
				},
				HttpStatus.CONFLICT,
			);

		const newUser = await this.authService.signUp(signUpInput);

		if (!newUser)
			throw new HttpException(
				{
					message: 'ユーザー登録に失敗しました',
				},
				HttpStatus.BAD_REQUEST,
			);

		return newUser;
	}
}
