import { Module } from '@nestjs/common';
import { ArtsService } from './arts.service';
import { ArtsController } from './arts.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersService } from '@/users/users.service';

@Module({
	imports: [PrismaModule],
	controllers: [ArtsController],
	providers: [ArtsService, UsersService],
	exports: [ArtsService],
})
export class ArtsModule {}
