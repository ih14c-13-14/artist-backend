import {
	Body,
	Controller,
	Post,
	Param,
	Put,
	HttpCode,
	ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Users } from '@prisma/client';
import { paths } from '@/generated/schema';
import { EmailValidation } from './dto/email-validation';
import { PasswordChange } from './dto/password-change';
import { InformationChangeValidation } from './dto/informationChange-validation';

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
		@Param(
			'user_id' satisfies paths['/api/v1/users/{user_id}/password-change']['put']['parameters']['path']['user_id'],
			new ParseUUIDPipe(),
		)
		id: string,
		@Body() newPassword: PasswordChange,
	): Promise<Users> {
		return this.usersService.passwordChange(id, newPassword);
	}
    
    //他情報変更処理
	@Put(':user_id/others-change')
	async informationChange(
		@Param(
			'user_id' satisfies paths['/api/v1/users/{user_id}/others-change']['put']['parameters']['path']['user_id'],
			new ParseUUIDPipe(),
		)
		id: string,
		@Body() informationInput: InformationChangeValidation,
	) {
		return await this.usersService.informationChange(id, informationInput);

	//新しいメールアドレスの受け取り
	@HttpCode(200)
	@Post(':user_id/email-change')
	async getNewEmail(
		@Param(
			'user_id' satisfies paths['/api/v1/users/{user_id}/email-change']['post']['parameters']['path']['user_id'],
			new ParseUUIDPipe(),
		)
		id: string,
		@Body() newEmail: EmailValidation,
	) {
		return this.usersService.getNewEmail(id, newEmail);
	}
}
