import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicService {
  constructor(@InjectRepository(Music) private musicRepository: Repository<Music>) {

  }

  create(createmusicDto: any) {
    return this.musicRepository.save(createmusicDto)
  }

  findAll(params: any) {
    console.log(params);
    return this.musicRepository.find({ where: { category: { id: params.categoryId } }, relations: { category: true } });
  }

  findOne(id: number) {
    return this.musicRepository.find({ where: { id: id }, relations: { category: true } });
  }

  async update(updateMusicDto: any) {
    const musicUpdated = await this.musicRepository.preload(updateMusicDto);
    return this.musicRepository.save(musicUpdated);
  }

  remove(id: number) {
    return this.musicRepository.delete(id)
  }
}
