import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { isNil } from 'lodash';
import { EmailValidation } from './dto/email-validation';
import { PasswordChange } from './dto/password-chenge';

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
            throw new HttpException({ message: 'Not Found.' }, HttpStatus.NOT_FOUND);
        }

        return {
            message: '成功',
        } as const;
    }

    // パスワード変更
    async passwordChange(id: string, NewPassword: PasswordChange): Promise<Users> {
        const changePassword = await this.prismaService.users.update({
            where: { id: id },
            data: { password: NewPassword.password },
        });
        return changePassword;
    }
}
