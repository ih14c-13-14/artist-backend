import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtsModule } from './arts/arts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [PrismaModule, ArtsModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
