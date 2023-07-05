import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { uuidv7 } from '@kripod/uuidv7';
import { convertAgeGroupToNumber } from '@/auth/utils/convertAge';
import { convertGenderToNumber } from '@/auth/utils/convertGender';
import { SignUpInput } from './dto/signup.input';

@Injectable()
export class AuthService {
	constructor(private readonly prismaService: PrismaService) {}

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
			where: { email },
		});
	}
}
