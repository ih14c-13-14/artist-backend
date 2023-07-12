import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { InformationChangeValidation } from './dto/informationChange-validation';
import { convertAgeGroupToNumber } from '@/auth/utils/convertAge';
import { convertGenderToNumber } from '@/auth/utils/convertGender';
import { isNil } from 'lodash';
import { EmailValidation } from './dto/email-validation';
import { PasswordChange } from './dto/password-change';
import { paths } from '@/generated/schema';
import * as bcrypt from 'bcrypt';
import { uuidv7 } from '@kripod/uuidv7';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	// email認証
	async getUserEmail(email: EmailValidation) {
		const { email: userEmail } = email;
		const get_email = await this.prismaService.users.findUnique({
			where: {
				email: userEmail,
			},
			select: {
				id: true,
				email: true,
			},
		});

		if (isNil(get_email?.email)) {
			throw new HttpException(
				{
					message: 'Not Found.',
				} satisfies paths['/api/v1/users/password-reset']['post']['responses']['404']['content']['application/json'],
				HttpStatus.NOT_FOUND,
			);
		}

		return {
			message: '成功',
		} as const;
	}

	// パスワード変更
	async passwordChange(
		id: string,
		newPassword: PasswordChange,
	): Promise<Users> {
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(newPassword.password, salt);
		const changePassword = await this.prismaService.users.update({
			where: { id: id },
			data: { password: hashPassword },
		});
		return changePassword;
	}

	async getUserById(user_id: string): Promise<Users> {
		return await this.prismaService.users.findUnique({
			where: {
				id: user_id,
			},
		});
	}

	//他情報変更処理
	async informationChange(
		id: string,
		informationInput: InformationChangeValidation,
	) {
		const { age_group, gender, prefecture } = informationInput;

		const selectedAgeGroup: number = convertAgeGroupToNumber(age_group);
		const selectedGender: number = convertGenderToNumber(gender);

		const prefectureId = await this.prismaService.prefectures.findFirst({
			where: { name: prefecture },
		});

		if (!prefectureId) throw new Error('都道府県コードが見つかりません');

		return await this.prismaService.users.update({
			where: { id: id },
			data: {
				age_group: selectedAgeGroup,
				gender: selectedGender,
				prefecture: { connect: { id: prefectureId.id } },
			},
		});
	}
    
	//新しいメールアドレスを受け取る
	async getNewEmail(id: string, newEmail: EmailValidation) {
		//emailがusersテーブルに存在しているか確認
		const userId = await this.prismaService.users.findFirst({
			where: { id: id },
		});
		if (!userId) {
			throw new HttpException(
				{
					type: 'validateion',
					message: [
						{
							property: 'user_id',
							message: 'ユーザーidが存在しません',
						},
					],
				} satisfies paths['/api/v1/users/{user_id}/email-change']['post']['responses']['400']['content']['application/json'],
				HttpStatus.BAD_REQUEST,
			);
		}

		const userEmail = await this.prismaService.users.findFirst({
			where: { email: newEmail.email },
		});
		if (userEmail) {
			throw new HttpException(
				{
					type: 'validateion',
					message: [
						{
							property: 'email',
							message: 'このメールアドレスはすでに登録されています',
						},
					],
				} satisfies paths['/api/v1/users/{user_id}/email-change']['post']['responses']['400']['content']['application/json'],
				HttpStatus.BAD_REQUEST,
			);
		}

		const now = new Date();
		const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

		/**
		 * トークンを生成し、1時間後のデータと共にデータベースに挿入します。
		 */
		await this.prismaService.token.create({
			data: {
				token: uuidv7(),
				type: 'EMAIL_CHANGE',
				expired_at: oneHourLater,
				user_id: id,
			},
		});

		//メール送信処理
	}
}
