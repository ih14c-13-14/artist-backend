import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { TOKENS } from '@/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from '../types/jwtPayload';
import { paths } from '@/generated/schema';
import { PasswordOmitUsers } from '../types/passwordOmitUsers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: TOKENS.ACCESS_TOKEN_SECRET,
		});
	}

	async validate(payload: JwtPayload): Promise<PasswordOmitUsers> {
		const user = await this.authService.getUser(payload.email);

		if (user) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}

		throw new HttpException(
			{
				message: 'ログインしてください',
			} satisfies paths['/api/v1/auth/signin']['post']['responses']['401']['content']['application/json'],
			HttpStatus.UNAUTHORIZED,
		);
	}
}
