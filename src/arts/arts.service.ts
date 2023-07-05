import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtServiceResponse } from './dto/art-service-response';

@Injectable()
export class ArtsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(): Promise<ArtServiceResponse[]> {
		return await this.prismaService.arts.findMany({
			select: {
				id: true,
				name: true,
				address: true,
				image_path: true,
				authors: {
					select: {
						name: true,
					},
				},
			},
		});
	}
}
