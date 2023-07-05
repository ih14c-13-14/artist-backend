import { Controller, Get } from '@nestjs/common';
import { ArtsService } from './arts.service';
import { ArtDTO } from './dto/art-dto';

@Controller('arts')
export class ArtsController {
	constructor(private readonly artsService: ArtsService) {}

	@Get()
	async findAll(): Promise<ArtDTO[]> {
		const arts = await this.artsService.findAll();
		const result: ArtDTO[] = arts.map((art) => ({
			'arts.id': art.id,
			'arts.name': art.name,
			'arts.address': art.address,
			'arts.image_path': art.image_path,
			'authors.name': art.authors.name,
		}));
		return result;
	}
}
