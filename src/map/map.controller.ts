import { Controller, Get } from '@nestjs/common';
import { ArtsService } from '@/arts/arts.service';
import { MapDTO } from './dto/map-dto';
import { paths } from '@/generated/schema';

@Controller('map')
export class MapController {
	constructor(private readonly artsService: ArtsService) {}

	/**
	 * マップに描画する住所を取得、art作品情報を取得するためのart_idを取得する処理
	 * @returns paths['/api/v1/map']['get']['responses']['200']
	 */
	@Get()
	async getAll(): Promise<MapDTO[]> {
		const arts = await this.artsService.getAll();
		const result: MapDTO[] = arts.map((art) => ({
			address: art.address,
			arts_id: art.id,
		}));
		return result satisfies paths['/api/v1/map']['get']['responses']['200']['content']['application/json'];
	}
}
