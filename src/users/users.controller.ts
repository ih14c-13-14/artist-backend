import {
	Body,
	Controller,
	Post,
	Param,
	Put,
	HttpCode,
	ParseUUIDPipe,
	Get,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Users } from '@prisma/client';
import { paths } from '@/generated/schema';
import { UsersService } from './users.service';
import { EmailValidation } from './dto/email-validation';
import { PasswordChange } from './dto/password-change';
import { convertNumberToAge } from '@/utils/convert-age';
import { convertNumberToGender } from '@/utils/convert-gender';
import { UserInfoDTO } from './dto/user-info';

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
		//userServiceのgetUserEmail(入力されたemail)を呼び出す
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

	/**
	 * userの情報を取得する。
	 * @returns paths['/api/v1/users/{user_id}/info']['get']['responses']['200']
	 */
	@Get(':user_id/info')
	async getUserInfoByUserId(
		@Param(
			'user_id' satisfies paths['/api/v1/users/{user_id}/info']['get']['parameters']['path']['user_id'],
			new ParseUUIDPipe(),
		)
		user_id: string,
	): Promise<UserInfoDTO> {
		const userInfo = await this.usersService.getUserInfoByUserId(user_id);
		const { age_group, prefecture, gender, email } = userInfo;
		const ageStr: string = convertNumberToAge(age_group);
		const genderStr: string = convertNumberToGender(gender);

		const result: UserInfoDTO = {
			age_group: ageStr,
			prefecture: prefecture.name,
			gender: genderStr,
			email: email,
		};

		return result satisfies paths['/api/v1/users/{user_id}/info']['get']['responses']['200']['content']['application/json'];
	}
}
