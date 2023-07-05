import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtsModule } from './arts/arts.module';

@Module({
	imports: [ArtsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
