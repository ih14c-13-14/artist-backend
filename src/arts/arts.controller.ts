import {
	BadRequestException,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
} from '@nestjs/common';
import { ArtsService } from './arts.service';
import { ArtDTO } from './dto/art-dto';
import { paths } from '@/generated/schema';
import { ArtDetailDTO } from './dto/art-detail';
@Controller('arts')
export class ArtsController {
	constructor(private readonly artsService: ArtsService) {}

	/**
	 * 作品全て取得処理
	 * @throws paths['/api/v1/arts']['get']['responses']['200']
	 */
	@Get()
	async getAll(): Promise<ArtDTO[]> {
		const arts = await this.artsService.getAll();
		const result: ArtDTO[] = arts.map((art) => ({
			'arts.id': art.id,
			'arts.name': art.name,
			'arts.address': art.address,
			'arts.image_path': art.image_path,
			'authors.name': art.authors.name,
		}));
		return result satisfies paths['/api/v1/arts']['get']['responses']['200']['content']['application/json'];
	}

	/**
	 * 作者ソート取得処理
	 * @throws paths['/api/v1/arts/author']['get']['responses']['200']
	 */
	@Get('author')
	async getAscByAuthor(): Promise<ArtDTO[]> {
		const arts = await this.artsService.getAscByAuthor();
		const result: ArtDTO[] = arts.map((art) => ({
			'arts.id': art.id,
			'arts.name': art.name,
			'arts.address': art.address,
			'arts.image_path': art.image_path,
			'authors.name': art.authors.name,
		}));
		return result satisfies paths['/api/v1/arts/author']['get']['responses']['200']['content']['application/json'];
	}

	/**
	 * 作品の詳細情報取得
	 * @throws paths['/api/v1/arts/{art_id}']['get']['responses']['200']
	 */
	@Get(':art_id')
	async getArtDetail(
		/**
		 * parametersで`art_id`取得
		 * paths['/api/v1/arts/{art_id}']['get']['parameters']['path']['art_id']
		 */
		@Param(
			'art_id' satisfies paths['/api/v1/arts/{art_id}']['get']['parameters']['path']['art_id'],
			new ParseUUIDPipe(),
		)
		art_id: string,
	): Promise<ArtDetailDTO> {
		const artDetail = await this.artsService.getArtDetail(art_id);
		/**
		 * 作品が存在しない場合
		 * @throws paths['/api/v1/arts/{art_id}']['get']['responses']['404']
		 */
		if (!artDetail) {
			throw new BadRequestException() satisfies paths['/api/v1/arts/{art_id}']['get']['responses']['404']['content']['application/json'];
		}

		const result = {
			'arts.id': artDetail.id,
			'arts.name': artDetail.name,
			'arts.address': artDetail.address,
			'arts.image_path': artDetail.image_path,
			'arts.description': artDetail.description,
			'arts.is_public': artDetail.is_public,
			'arts.created_year': artDetail.created_year,
			'arts.datetime_description': artDetail.datetime_description,
			'arts.closed_day_description': artDetail.closed_day_description,
			'institutions.admission_fee_description':
				artDetail.arts_institutions[0].institution.admission_fee_description,
			'authors.name': artDetail.authors.name,
			'authors.image_path': artDetail.authors.image_path,
		} as const;

		return result satisfies paths['/api/v1/arts/{art_id}']['get']['responses']['200']['content']['application/json'];
	}
}
