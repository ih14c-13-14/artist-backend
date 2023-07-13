import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prefectures } from '@prisma/client';

@Injectable()
export class PrefecturesService {
	constructor(private readonly prismaService: PrismaService) {}
	async getAll(): Promise<Prefectures[]> {
		return this.prismaService.prefectures.findMany();
	}
}
