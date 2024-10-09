import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './module/music/music.module';
import { CategoryModule } from './module/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { FileModule } from './module/file/file.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MusicModule, CategoryModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
