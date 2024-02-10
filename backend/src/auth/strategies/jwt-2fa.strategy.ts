import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, '2fa') {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<User> {
    const { id } = payload;
    const user: User = await this.userRepository.findOneBy({ id });

    if (!user.isTwoFactorAuthenticationEnabled) {
      return user;
    }
    if (user.isTwoFactorAuthenticationEnabled) {
      return user;
    }
  }
}
