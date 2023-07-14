import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { MockProxy, mock } from 'jest-mock-extended';
import { HttpException } from '@nestjs/common';
import { PasswordOmitUsers } from './types/passwordOmitUsers';
import { Users } from '@prisma/client';

describe('AuthController', () => {
	let authController: AuthController;
	let mockAuthService: MockProxy<AuthService>;

	beforeEach(async () => {
		mockAuthService = mock<AuthService>();
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useValue: mockAuthService }],
		}).compile();

		authController = module.get<AuthController>(AuthController);
	});

	describe('signUp', () => {
		it('should return access token if sign up successfully', async () => {
			const signUpInput: SignUpInput = {
				email: 'test@example.com',
				password: 'aaaaAAAA1234',
				age_group: 1,
				gender: 1,
				prefecture: 1,
			};

			mockAuthService.getUser.mockResolvedValue(null);
			mockAuthService.signUp.mockResolvedValue({
				id: '1',
				password: 'aaaaAAAA1234',
				email: 'test@test.com',
				age_group: 1,
				gender: 1,
				prefecture_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			} satisfies Users);
			mockAuthService.signIn.mockResolvedValue('access_token');

			expect(await authController.signUp(signUpInput)).toEqual({
				access_token: 'access_token',
			});
		});

		it('should throw an error if email is already registered', async () => {
			const signUpInput: SignUpInput = {
				email: 'test@example.com',
				password: 'aaaaAAAA1234',
				age_group: 1,
				gender: 1,
				prefecture: 1,
			};

			mockAuthService.getUser.mockResolvedValue({
				id: '1',
				password: 'aaaaAAAA1234',
				email: 'test@test.com',
				age_group: 1,
				gender: 1,
				prefecture_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			} satisfies Users);

			await expect(authController.signUp(signUpInput)).rejects.toThrow(
				HttpException,
			);
		});
	});

	describe('signIn', () => {
		it('should return access token if sign in successfully', async () => {
			const signInInput: SignInInput = {
				email: 'test@test.com',
				password: 'password',
			};

			mockAuthService.validateUser.mockResolvedValue({
				id: '1',
				email: signInInput.email,
				age_group: 1,
				gender: 1,
				created_at: new Date(),
				updated_at: new Date(),
				prefecture_id: 1,
			} satisfies PasswordOmitUsers);
			mockAuthService.signIn.mockResolvedValue('access_token');

			expect(await authController.signIn(signInInput)).toEqual({
				access_token: 'access_token',
			});
		});

		it('should throw an error if email or password is incorrect', async () => {
			const signInInput: SignInInput = {
				email: 'test@test.com',
				password: 'incorrect_password',
			};

			mockAuthService.validateUser.mockResolvedValue(null);

			await expect(authController.signIn(signInInput)).rejects.toThrow(
				HttpException,
			);
		});
	});
});
