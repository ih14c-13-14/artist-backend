import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { uuidv7 } from '@kripod/uuidv7';
import { convertAgeGroupToNumber } from '@/auth/utils/convertAge';
import { convertGenderToNumber } from '@/auth/utils/convertGender';
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

		const selectedAgeGroup: number = convertAgeGroupToNumber(age_group);
		const selectedGender: number = convertGenderToNumber(gender);

		const prefectureId = await this.prismaService.prefectures.findFirst({
			where: { name: prefecture },
		});

		// TODO: prefectureIdが見つからなかった場合の例外処理を書く
		if (!prefectureId) throw new Error('都道府県コードが見つかりません');

		return await this.prismaService.users.create({
			data: {
				id: uuidv7(),
				email,
				password: hashPassword,
				age_group: selectedAgeGroup,
				gender: selectedGender,
				prefecture: { connect: { id: prefectureId.id } },
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
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async signIn(user: PasswordOmitUsers): Promise<string> {
		const payload: JwtPayload = { email: user.email, sub: user.id };
		const accessToken = await this.jwtService.sign(payload);
		return accessToken;
	}
}
