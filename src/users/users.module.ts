import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersController } from './users.controller';
import { PrefecturesService } from '@/prefectures/prefectures.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	providers: [UsersService, PrefecturesService],
	controllers: [UsersController],
})
export class UsersModule {}
