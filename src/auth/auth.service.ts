import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { uuidv7 } from '@kripod/uuidv7';
import { SignUpInput } from './dto/signup.input';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwtPayload';
import { PasswordOmitUsers } from './types/passwordOmitUsers';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private jwtService: JwtService,
	) {}

	async signUp(signUpInput: SignUpInput): Promise<Users> {
		const { email, password, age_group, gender, prefecture } = signUpInput;

		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);

		// TODO:age_group, gender, prefectureをnumber型に変換する際にエラーが発生した場合の処理
		const age_group_number = Number(age_group);
		const gender_number = Number(gender);
		const prefecture_number = Number(prefecture);

		return await this.prismaService.users.create({
			data: {
				id: uuidv7(),
				email,
				password: hashPassword,
				age_group: age_group_number,
				gender: gender_number,
				prefecture: { connect: { id: prefecture_number } },
			},
		});
	}

	async getUser(email: string): Promise<Users> {
		return await this.prismaService.users.findUnique({
			where: {
				email,
			},
		});
	}

	async verifyPassword(
		plainTextPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		const isPasswordMatching = await bcrypt.compare(
			plainTextPassword,
			hashedPassword,
		);
		return isPasswordMatching;
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<PasswordOmitUsers | null> {
		const user = await this.getUser(email);

		if (user && (await this.verifyPassword(password, user.password))) {
			const { password: _password, ...result } = user;
			return result;
		}
		return null;
	}

	async signIn(user: PasswordOmitUsers): Promise<string> {
		const payload: JwtPayload = {
			email: user.email,
			sub: user.id,
		};
		const accessToken = await this.jwtService.signAsync(payload);
		return accessToken;
	}
}
