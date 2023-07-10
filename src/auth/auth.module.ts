import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TOKENS } from '@/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: TOKENS.ACCESS_TOKEN_SECRET,
			signOptions: {
				expiresIn: TOKENS.ACCESS_EXPIRES_IN,
			},
		}),
	],
	providers: [AuthService, JwtStrategy, JwtAuthGuard],
	controllers: [AuthController],
	exports: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
