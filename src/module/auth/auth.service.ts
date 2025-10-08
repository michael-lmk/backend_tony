import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ email: email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    delete user.password;
    delete user.salt;

    const payload = { id: user.id, username: user.firstname, rank: user.rank };

    console.log('User object being sent from backend:', user);

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findOneBy({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      salt: salt,
      rank: 1, // Default rank for new users
    });

    delete newUser.password;
    delete newUser.salt;
    return newUser;
  }
}