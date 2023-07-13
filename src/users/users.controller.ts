import {
	Body,
	Controller,
	Post,
	Param,
	Put,
	HttpCode,
	ParseUUIDPipe,
	Get,
	InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '@prisma/client';
import { paths } from '@/generated/schema';
import { EmailValidation } from './dto/email-validation';
import { PasswordChange } from './dto/password-change';
import { InformationChangeValidation } from './dto/information-change-validation';
import { convertNumberToAge } from '@/utils/convert-age';
import { convertNumberToGender } from '@/utils/convert-gender';
import { convertNumberToAge, getAllAge } from '@/utils/convert-age';
import { convertNumberToGender, getAllGender } from '@/utils/convert-gender';
import { UserInfoDTO } from './dto/user-info';
import { PrefecturesService } from '@/prefectures/prefectures.service';
import { SignUpPageChoicesDTO } from './dto/signup-page-choices';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly prefecturesService: PrefecturesService,
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

	/**
	 * インプットの選択肢を返却する。
	 * @returns paths['/api/v1/users/signup-page/choices']['get']['responses']['200']
	 */
	@Get('signup-page/choices')
	async getSignUpPageChoices(): Promise<SignUpPageChoicesDTO> {
		const age_group = getAllAge();
		const gender = getAllGender();
		const prefectures = await this.prefecturesService.getAll();

		/**
		 * DBに格納されている値が不正な時。
		 * @throws paths['/api/v1/users/signup-page/choices']['get']['responses']['500']
		 */
		if (age_group === undefined || gender === undefined) {
			throw new InternalServerErrorException() satisfies paths['/api/v1/users/signup-page/choices']['get']['responses']['500']['content']['application/json'];
		}

		const result = {
			age_groupChoices: age_group,
			prefectureChoices: prefectures,
			genderChoices: gender,
		} as const;
		return result satisfies paths['/api/v1/users/signup-page/choices']['get']['responses']['200']['content']['application/json'];
	}
}
