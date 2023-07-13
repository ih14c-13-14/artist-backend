import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersController } from './users.controller';
import { PrefecturesService } from '@/prefectures/prefectures.service';

@Module({
	imports: [PrismaModule],
	providers: [UsersService, PrefecturesService],
	controllers: [UsersController],
})
export class UsersModule {}
