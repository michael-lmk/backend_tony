import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException();
    }

    let isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    delete user.password;
    const payload = { id: user.id, username: user.firstname, rank: user.rank };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
