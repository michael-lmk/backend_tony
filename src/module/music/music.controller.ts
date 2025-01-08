import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileService } from '../file/file.service';
import { createReadStream, createWriteStream } from 'fs';
import * as archiver from 'archiver';
import { join } from 'path';
import * as fs from 'fs';
import { In } from 'typeorm';
import * as JSZip from 'jszip';
import * as moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  create(@Body() createMusicDto: any) {
    return this.musicService.create(createMusicDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.musicService.findAll(query);
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

  /**
   * Fonction qui télécharge l'ensemble des fichiers audios dans un dossier compressé
   * @param body
   */
  @Post('download-tracks')
  async downloadTracks(@Body() body: any, @Res() res: any) {
    const musicIds = body; // Liste d'IDs de musique.

    let zip = new JSZip(); // Créer une nouvelle instance de JSZip
    let exportFolder = zip.folder('track');

    // Liste des fichiers à ajouter dans l'archive
    const filesToAdd = [
      '../../../public/wav/2024/10/02/7g39emJa20241002183640458.wav',
      '../../../public/wav/2024/10/02/OCV2MoJc20241002200651021.wav',
      '../../../public/wav/2024/10/12/9ywdTv3q20241012123704204.wav',
    ];

    // Ajouter les fichiers à l'archive
    for (const filePath of filesToAdd) {
      const resolvedPath = join(__dirname, '..', filePath); // Résoudre le chemin absolu

      if (fs.existsSync(resolvedPath)) {
        const fileContent = fs.readFileSync(resolvedPath, 'utf-8'); // Lire le contenu du fichier
        exportFolder.file(filePath.split('/').pop(), fileContent); // Ajouter le fichier à l'archive
      } else {
        console.log(`Fichier introuvable : ${resolvedPath}`);
      }
    }

    // Générer le fichier ZIP en mémoire
    try {
      zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
        let folder = 'public/a_supprimer/';
        let filename = 'track_' + moment().format('YYYYMMDDHHmmii') + '.zip';
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true });
        }

        fs.writeFile(
          folder + filename,
          content,
          { encoding: 'utf8' },
          (err) => {
            if (err) {
              return res.status(404).send('zip erreur');
            }

            fs.readFile(folder + filename, function (err2, data) {
              if (err2) {
                return res.status(404).send('zip not found');
              }
              res.contentType("application/zip");
              res.send(data); // Envoyer les données de l'image au navigateur ou à l'application cliente.
            });
          },
        );
      });
    } catch (error) {
      console.error('Erreur lors de la génération du fichier ZIP:', error);
      res
        .status(500)
        .send({ message: 'Erreur lors de la génération du fichier ZIP' });
    }
  }
}
