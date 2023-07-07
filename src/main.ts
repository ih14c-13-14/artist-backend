import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => {
				const result = errors.map((error) => ({
					property: error.property,
					message: error.constraints[Object.keys(error.constraints)[0]],
				}));
				return new BadRequestException({ type: 'validation', message: result });
			},
			stopAtFirstError: true,
		}),
	);
	app.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(3000);
}
bootstrap();
