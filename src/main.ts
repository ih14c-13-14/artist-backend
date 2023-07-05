import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// TODO: 400の判定を追加する
	await app.listen(3000);
}
bootstrap();
