import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: any) {
    try {
      let alreadyExiste = await this.usersService.findOne({
        email: createUserDto.email,
      });

      if (alreadyExiste) {
        return { message: 'Email déjà utilisée.' };
      }

      let salt = await bcrypt.genSalt();

      let hash = await bcrypt.hash(createUserDto.password, salt);

      createUserDto.password = hash;
      createUserDto.salt = salt;

      return this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
