import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	InternalServerErrorException,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post,
} from '@nestjs/common';
import { paths } from '@/generated/schema';
import { ArtsService } from './arts.service';
import { ArtDTO } from './dto/art-dto';
import { ArtDetailDTO } from './dto/art-detail';
import { UserIdDTO } from './dto/user-id.dto';
import { UsersService } from '@/users/users.service';
@Controller('arts')
export class ArtsController {
	constructor(
		private readonly artsService: ArtsService,
		private readonly usersService: UsersService,
	) {}

	/**
	 * 作品全て取得処理
	 * @returns paths['/api/v1/arts']['get']['responses']['200']
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
	 * @returns paths['/api/v1/arts/{art_id}']['get']['responses']['200']
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

	/**
	 * お気に入り成功
	 * @returns paths['/api/v1/arts/{art_id}/favorite']['post']['responses']['200']
	 */
	@HttpCode(200)
	@Post(':art_id/favorite')
	// TODO: Guard追加
	// TODO: ユーザのTOKENが正しいか, ユーザとJWTトークンが一致しているか。
	async favoriteArt(
		/**
		 * parametersで`art_id`取得
		 * paths['/api/v1/arts/{art_id}']['get']['parameters']['path']['art_id']
		 */
		@Param(
			'art_id' satisfies paths['/api/v1/arts/{art_id}/favorite']['post']['parameters']['path']['art_id'],
			new ParseUUIDPipe(),
		)
		art_id: string,
		@Body() userIdDTO: UserIdDTO,
	): Promise<{ message: string }> {
		const { user_id } = userIdDTO;

		/**
		 * 作品が存在しない時。
		 * @throws paths['/api/v1/arts/{art_id}/favorite']['post']['responses']['404']
		 */
		const isArt = await this.artsService.isArtIdExists(art_id);
		if (!isArt) {
			throw new NotFoundException() satisfies paths['/api/v1/arts/{art_id}/favorite']['post']['responses']['404']['content']['application/json'];
		}

		/**
		 * 作品がすでにお気に入りされている場合
		 * @throws paths['/api/v1/arts/{art_id}/favorite']['post']['responses']['400']
		 */
		const isFavorite = await this.artsService.isFavoriteArtWithUserIdExists(
			art_id,
			user_id,
		);
		if (isFavorite) {
			throw new BadRequestException({
				type: 'validation',
				message: [
					{
						property: 'art_id',
						message: '作品がすでにお気に入りされています。',
					},
				],
			} satisfies paths['/api/v1/arts/{art_id}/favorite']['post']['responses']['400']['content']['application/json']);
		}

		/**
		 * お気に入り登録に失敗した時
		 * @throws paths['/api/v1/arts/{art_id}/favorite']['post']['responses']['500']
		 */
		const data = await this.artsService.createArtWithUserId(art_id, user_id);
		if (!data) {
			throw new InternalServerErrorException() satisfies paths['/api/v1/arts/{art_id}/favorite']['post']['responses']['500']['content']['application/json'];
		}
		return {
			message: 'success',
		} satisfies paths['/api/v1/arts/{art_id}/favorite']['post']['responses']['200']['content']['application/json'];
	}

	/**
	 * お気に入り作品の削除
	 * @returns paths['/api/v1/arts/{art_id}/favorite']['delete']['responses']['200']
	 */
	@Delete(':art_id/favorite')
	// TODO: Guard追加
	// TODO: ユーザのTOKENが正しいか, ユーザとJWTトークンが一致しているか。
	async deleteFavoriteByArtIdWithUserId(
		/**
		 * parametersで`art_id`取得
		 * paths['/api/v1/arts/{art_id}/favorite']['delete']['parameters']['path']['art_id']
		 */
		@Param(
			'art_id' satisfies paths['/api/v1/arts/{art_id}/favorite']['delete']['parameters']['path']['art_id'],
			new ParseUUIDPipe(),
		)
		art_id: string,
		@Body() userIdDTO: UserIdDTO,
	) {
		const { user_id } = userIdDTO;
		/**
		 * 作品がお気に入りされていない場合
		 * @throws paths['/api/v1/arts/{art_id}/favorite']['delete']['responses']['404']
		 */
		const isFavorite = await this.artsService.isFavoriteArtWithUserIdExists(
			art_id,
			user_id,
		);
		if (!isFavorite) {
			throw new NotFoundException() satisfies paths['/api/v1/arts/{art_id}/favorite']['delete']['responses']['404']['content']['application/json'];
		}

		this.artsService.deleteArtWithArtIdUserId(art_id, user_id);
		return {
			message: 'deleted',
		} satisfies paths['/api/v1/arts/{art_id}/favorite']['delete']['responses']['200']['content']['application/json'];
	/*
	 * お気に入りの作品を取得
	 * @returns paths['/api/v1/arts/{user_id}/favorited']['get']['responses']['200']
	 */
	@Get(':user_id/favorited')
	// TODO: Guard追加
	// TODO: ユーザのTOKENが正しいか, ユーザとJWTトークンが一致しているか。
	async getFavoriteByArtIdWithUserId(
		@Param(
			/**
			 * parameterで`user_id`を取得
			 * paths['/api/v1/arts/{user_id}/favorited']['get']['parameters']['path']['user_id']
			 */
			'user_id' satisfies paths['/api/v1/arts/{user_id}/favorited']['get']['parameters']['path']['user_id'],
			new ParseUUIDPipe(),
		)
		user_id: string,
	): Promise<ArtDTO[]> {
		/**
		 * ユーザが存在しない時
		 * @throws paths['/api/v1/arts/{user_id}/favorited']['get']['responses']['404']
		 */
		const user = await this.usersService.getUserById(user_id);
		if (!user) {
			throw new NotFoundException() satisfies paths['/api/v1/arts/{user_id}/favorited']['get']['responses']['404']['content']['application/json'];
		}

		// 保存されているart_idを全て取得
		const favoriteArtId = await this.artsService.getFavoriteArtIdByUserId(
			user_id,
		);
		const artIds: string[] = favoriteArtId.map((item) => item.art_id);

		const arts = await this.artsService.getFavoriteArtsByArtId(artIds);
		const result: ArtDTO[] = arts.map((art) => ({
			'arts.id': art.id,
			'arts.name': art.name,
			'arts.address': art.address,
			'arts.image_path': art.image_path,
			'authors.name': art.authors.name,
		}));
		return result satisfies paths['/api/v1/arts/{user_id}/favorited']['get']['responses']['200']['content']['application/json'];
	}
}
