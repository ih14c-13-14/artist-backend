import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { InformationChangeValidation } from './dto/informationChange-validation';
import { convertAgeGroupToNumber } from '@/auth/utils/convertAge';
import { convertGenderToNumber } from '@/auth/utils/convertGender';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

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
}
