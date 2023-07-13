import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PrefecturesService } from './prefectures.service';

@Module({
	imports: [PrismaModule],
	providers: [PrefecturesService],
})
export class PrefecturesModule {}
