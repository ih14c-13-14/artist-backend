import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersService', () => {
	const setup = async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: PrismaService,
					useValue: {
						// Create a mock Prisma Service
						users: {
							findUnique: jest
								.fn()
								.mockResolvedValue({ id: 'test', email: 'test@test.com' }),
							update: jest.fn().mockResolvedValue({
								id: 'test',
								email: 'test@test.com',
								password: 'newPassword',
							}),
						},
					},
				},
			],
		}).compile();

		return {
			service: module.get<UsersService>(UsersService),
			prismaService: module.get<PrismaService>(PrismaService),
		};
	};

	it('should be defined', async () => {
		const { service } = await setup();
		expect(service).toBeDefined();
	});

	describe('getUserEmail', () => {
		it('should return successful message if user is found', async () => {
			const { service } = await setup();
			const result = await service.getUserEmail('test@test.com');
			expect(result).toEqual({ message: '成功' });
		});

		it('should throw an exception if user is not found', async () => {
			const { service, prismaService } = await setup();
			jest.spyOn(prismaService.users, 'findUnique').mockResolvedValueOnce(null);
			try {
				await service.getUserEmail('test@test.com');
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.status).toEqual(HttpStatus.NOT_FOUND);
			}
		});
	});

	describe('passwordChange', () => {
		it('should change password and return the user', async () => {
			const { service } = await setup();
			const result = await service.passwordChange('test', 'newPassword');
			expect(result).toEqual({
				id: 'test',
				email: 'test@test.com',
				password: 'newPassword',
			});
		});
	});
});
