import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtServiceResponse } from './dto/art-service-response';
import { artDetailServiceResponse } from './dto/art-detail-service-response';
import { ArtsUsers } from '@prisma/client';

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

	async createArtWithUserId(
		art_id: string,
		user_id: string,
	): Promise<ArtsUsers> {
		const data = await this.prismaService.artsUsers.create({
			data: {
				art_id,
				user_id,
			},
		});
		return data;
	}

	async deleteArtWithArtIdUserId(
		art_id: string,
		user_id: string,
	): Promise<ArtsUsers> {
		const data = await this.prismaService.artsUsers.delete({
			where: {
				art_id_user_id: {
					art_id,
					user_id,
				},
			},
		});
		return data;
	}

	async isArtIdExists(art_id: string): Promise<boolean> {
		let isArt = false;
		const art = await this.prismaService.arts.findUnique({
			where: {
				id: art_id,
			},
		});
		if (art) isArt = !isArt;
		return isArt;
	}

	async isFavoriteArtWithUserIdExists(
		art_id: string,
		user_id: string,
	): Promise<boolean> {
		let isFavorite = true;
		const favoriteArt = await this.prismaService.artsUsers.findUnique({
			where: {
				art_id_user_id: {
					art_id,
					user_id,
				},
			},
		});

		if (!favoriteArt) isFavorite = !isFavorite;
		return isFavorite;
	}

	async getFavoriteArtIdByUserId(
		user_id: string,
	): Promise<{ art_id: string }[]> {
		return await this.prismaService.artsUsers.findMany({
			select: {
				art_id: true,
			},
			where: {
				user_id,
			},
		});
	}

	async getFavoriteArtsByArtId(
		artIds: string[],
	): Promise<ArtServiceResponse[]> {
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
			where: {
				id: {
					in: artIds,
				},
			},
		});
	}
}
