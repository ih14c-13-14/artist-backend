import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
	const setup = async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: {
						// Create a mock Users Service
						getUserEmail: jest.fn().mockResolvedValue({ message: '成功' }),
						passwordChange: jest.fn().mockResolvedValue({
							id: 'test',
							email: 'test@test.com',
							password: 'newPassword',
						}),
					},
				},
				PrismaService, // PrismaService is not mocked in this case, if you need to mock, repeat the strategy used with UsersService
			],
		}).compile();

		return {
			controller: module.get<UsersController>(UsersController),
			usersService: module.get<UsersService>(UsersService),
		};
	};

	it('should be defined', async () => {
		const { controller } = await setup();
		expect(controller).toBeDefined();
	});

	describe('getUserEmail', () => {
		it('should return successful message if email is provided', async () => {
			const { controller } = await setup();
			const result = await controller.getUserEmail('test@test.com');
			expect(result).toEqual({ message: '成功' });
		});

		it('should throw an exception if email is not provided', async () => {
			const { controller } = await setup();
			try {
				await controller.getUserEmail(undefined);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.status).toEqual(HttpStatus.BAD_REQUEST);
			}
		});
	});

	describe('updateUserPassword', () => {
		it('should change password and return the user', async () => {
			const { controller } = await setup();
			const result = await controller.updateUserPassword('test', 'newPassword');
			expect(result).toEqual({
				id: 'test',
				email: 'test@test.com',
				password: 'newPassword',
			});
		});
	});
});
