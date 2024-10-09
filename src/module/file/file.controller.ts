import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.create(file);
  }

  @Get('/:fileName')
  async read(@Param('fileName') fileName: string, @Res() res: any) {

    const type = fileName.split('.').pop();

    this.fileService.read(fileName, type).then((data) => {
      if (!data) {
        res.send(500, { data: data });
      }

      res.contentType(type == 'mp3' ? `audio/${type}` : `images/${type}`);

      res.send(data);
    }).catch((err) => {
      console.log(err);
    });

  }
  @Get('/stream/:fileName')
  async stream(@Param('fileName') fileName: string, @Res() res: Response) {
  
    const type = fileName.split('.').pop();
  
    this.fileService.getFilePath(fileName, type).then((path) => {
  
      const stream = createReadStream(path);
  
      // Définir le bon type MIME en fonction du fichier
      if (type === 'mp3' || type === 'wav') {
        res.setHeader('Content-Type', `audio/${type}`);
      } else {
        res.setHeader('Content-Type', `image/${type}`);
      }
  
      // Utiliser stream.pipe pour transmettre le flux au client
      stream.pipe(res);
  
      // Gérer les erreurs sur le flux
      stream.on('error', (err) => {
        console.error('Stream error:', err);
        res.status(500).send('Erreur lors de la lecture du fichier');
      });
  
    }).catch((err) => {
      console.log(err);
      res.status(404).send('Fichier non trouvé');
    });
  }

}
