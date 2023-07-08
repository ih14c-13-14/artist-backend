import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtServiceResponse } from './dto/art-service-response';
import { artDetailServiceResponse } from './dto/art-detail-service-response';

@Injectable()
export class ArtsService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(): Promise<ArtServiceResponse[]> {
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

	async getAscByAuthor(): Promise<ArtServiceResponse[]> {
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
			orderBy: {
				authors: {
					name_kana: 'asc',
				},
			},
		});
	}

	async getArtDetail(art_id: string): Promise<artDetailServiceResponse> {
		return await this.prismaService.arts.findUnique({
			select: {
				id: true,
				name: true,
				address: true,
				image_path: true,
				description: true,
				is_public: true,
				created_year: true,
				datetime_description: true,
				closed_day_description: true,
				arts_institutions: {
					select: {
						institution: {
							select: {
								admission_fee_description: true,
							},
						},
					},
				},
				authors: {
					select: {
						name: true,
						image_path: true,
					},
				},
			},
			where: {
				id: art_id,
			},
		});
	}
}
