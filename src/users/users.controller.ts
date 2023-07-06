import {
	Body,
	Controller,
	Post,
	HttpException,
	HttpStatus,
	Param,
	Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Users } from '@prisma/client';
import { paths } from '@/generated/schema';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly prismaService: PrismaService,
	) {}

	// email認証処理
	@Post('password-reset')
	async getUserEmail(@Body('email') email: string) {
		if (email === undefined) {
			// throw new HttpException({ message: 'できた' }, HttpStatus.BAD_REQUEST);
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
		//userServiceのgetUserEmail(入力されたemmail)を呼び出す
		return (await this.usersService.getUserEmail(
			email,
		)) satisfies paths['/api/v1/users/password-reset']['post']['responses']['200']['content']['application/json'];
	}

	//パスワード変更処理
	@Put(':user_id/password-change')
	updateUserPassword(
		@Param('user_id') id: string,
		@Body() NewPassword: string,
	): Promise<Users> {
		return this.usersService.passwordChange(id, NewPassword);
	}
}
