import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ArtsModule } from './arts/arts.module';
import { UsersModule } from './users/users.module';
import { MapModule } from './map/map.module';

@Module({
	imports: [PrismaModule, AuthModule, ArtsModule, UsersModule, MapModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
