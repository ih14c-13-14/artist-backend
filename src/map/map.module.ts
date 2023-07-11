import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { ArtsModule } from '@/arts/arts.module';

@Module({
	imports: [PrismaModule, ArtsModule],
	controllers: [MapController],
})
export class MapModule {}
