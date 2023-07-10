import { IsUUID } from 'class-validator';

export class UserIdDTO {
	@IsUUID()
	user_id: string;
}
