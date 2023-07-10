import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

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
}
