import { Body, Controller, Post, Param, Put, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Users } from '@prisma/client';
import { paths } from '@/generated/schema';
import { EmailValidation } from './dto/email-validation';
import { PasswordChange } from './dto/password-chenge';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly prismaService: PrismaService,
	) {}

	// email認証処理
	@HttpCode(200)
	@Post('password-reset')
	async getUserEmail(@Body() updateUsersInput: EmailValidation) {
		//userServiceのgetUserEmail(入力されたemmail)を呼び出す
		return (await this.usersService.getUserEmail(
			updateUsersInput,
		)) satisfies paths['/api/v1/users/password-reset']['post']['responses']['200']['content']['application/json'];
	}

	//パスワード変更処理
	@Put(':user_id/password-change')
	updateUserPassword(
		@Param('user_id') id: string,
		@Body() NewPassword: PasswordChange,
	): Promise<Users> {
		return this.usersService.passwordChange(id, NewPassword);
	}
}
