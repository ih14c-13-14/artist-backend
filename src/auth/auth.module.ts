import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: process.env.JWT_ACCESS_TOKEN_SECRET,
			signOptions: {
				expiresIn: 3600,
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, JwtAuthGuard],
	exports: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
