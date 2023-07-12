import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
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

	//新しいメールアドレスを受け取る
	async getNewEmail(id: string, newEmail: EmailValidation) {
		//emailがusersテーブルに存在しているか確認
		const userId = await this.prismaService.users.findFirst({
			where: { id: id },
		});
		const userEmail = await this.prismaService.users.findFirst({
			where: { email: newEmail.email },
		});

		if (!userId) {
			throw new Error('ユーザーが存在していません');
		}
		if (userEmail) {
			throw new Error('他のユーザーがメールアドレスを使用されています');
		}

		const now = new Date();
		const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

		//token生成
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
