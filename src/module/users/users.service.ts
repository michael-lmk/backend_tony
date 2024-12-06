import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: any) {
    console.log(createUserDto);

    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(params: any) {
    return this.usersRepository.findOne({
      where: params,
      relations: { favories: true },
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    const preloadData = await this.usersRepository.preload(updateUserDto);

    return this.usersRepository.save(preloadData);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
