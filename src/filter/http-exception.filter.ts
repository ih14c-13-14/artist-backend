import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { components } from '@/generated/schema';

type ErrorResponse = {
	readonly type?: string;
	readonly message: ValidationError[];
};

type ValidationError = {
	property: string;
	message: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		const getResponse = (exception: HttpException, status: number) => {
			switch (status) {
				case HttpStatus.BAD_REQUEST:
					const errorResponse = exception.getResponse() as ErrorResponse;
					const { type, message } = errorResponse;
					return {
						type,
						message,
					} satisfies components['schemas']['BadRequestResponse'];
				case HttpStatus.UNAUTHORIZED:
					return {
						message: exception.message,
					} satisfies components['schemas']['UnauthorizedResponse'];
				case HttpStatus.FORBIDDEN:
					return {
						message: exception.message,
					} satisfies components['schemas']['ForbiddenResponse'];
				case HttpStatus.NOT_FOUND:
					return {
						message: exception.message,
					} satisfies components['schemas']['NotFoundResponse'];
				case HttpStatus.INTERNAL_SERVER_ERROR:
					return {
						message: exception.message,
					} satisfies components['schemas']['InternalServerErrorResponse'];
			}
		};

		const handleException = (exception: HttpException) => {
			const errorResponse = getResponse(exception, status);
			response.status(status).json(errorResponse);
		};

		handleException(exception);
	}
}
