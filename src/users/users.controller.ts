import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { InformationChangeValidation } from './dto/informationChange-validation';
import { paths } from '@/generated/schema';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	//他情報変更処理
	@Put(':user_id/others-change')
	async informationChange(
		@Param(
			'user_id' satisfies paths['/api/v1/users/{user_id}/others-change']['put']['parameters']['path']['user_id'],
			new ParseUUIDPipe(),
		)
		id: string,
		@Body() informationInput: InformationChangeValidation,
	) {
		return await this.usersService.informationChange(id, informationInput);
	}
}
