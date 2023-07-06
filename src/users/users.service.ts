import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { isNil } from 'lodash';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	// email認証
	async getUserEmail(email: string) {
		const get_email = await this.prismaService.users.findUnique({
			where: {
				email: email,
			},
			select: {
				id: true,
				email: true,
			},
		});

		if (isNil(get_email?.email)) {
			throw new HttpException({ message: 'Not Found.' }, HttpStatus.NOT_FOUND);
		}

		return {
			message: '成功',
		} as const;
	}

	// パスワード変更
	async passwordChange(id: string, NewPassword: string): Promise<Users> {
		const changePassword = await this.prismaService.users.update({
			where: { id: id },
			data: { password: NewPassword },
		});
		return changePassword;
	}
}
