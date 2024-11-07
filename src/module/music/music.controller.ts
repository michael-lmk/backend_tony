import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileService } from '../file/file.service';
import { createReadStream } from 'fs';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService, private readonly fileService: FileService) { }

  @Post()
  create(@Body() createMusicDto: any) {
    return this.musicService.create(createMusicDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.musicService.findAll(query)
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);

  }

  @Patch(':id')
  update(@Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(updateMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }
}
