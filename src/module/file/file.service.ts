import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

@Injectable()
export class FileService {
  generateRandomString(num = 8) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    return result1;
  }

  async create(file: any): Promise<{}> {
    const type = file.originalname.split('.').pop();
    const year = moment().format('YYYY');
    const month = moment().format('MM');
    const day = moment().format('DD');
    const newName = `${this.generateRandomString()}${year}${month}${day}${moment().format('HHmmssSSS')}.${type}`;
    const dir = `public/${type}/${year}/${month}/${day}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const path = `${dir}/${newName}`;
    const fd = await fsPromises.open(path, 'w');
    await fsPromises.writeFile(fd, file.buffer, { encoding: 'binary' });
    return { name: newName };
  }

  async read(fileName: string, type: string) {
    const regex =
      /^([A-Za-z0-9]{8})(\d{4})(\d{2})(\d{2})(\d{9}).(png|jpg|jpeg|mp3|wav)/g;
    const infoReg = [...fileName.matchAll(regex)];

    if (infoReg.length > 0) {
      const path = `public/${type}/${infoReg[0][2]}/${infoReg[0][3]}/${infoReg[0][4]}/${fileName}`;
      return await fsPromises.readFile(path);
    } else {
      throw 404;
    }
  }

  async getFilePath(fileName: string, type: string) {
    const regex =
      /^([A-Za-z0-9]{8})(\d{4})(\d{2})(\d{2})(\d{9}).(png|jpg|jpeg|mp3|wav)/g;
    const infoReg = [...fileName.matchAll(regex)];

    if (infoReg.length > 0) {
      return `public/${type}/${infoReg[0][2]}/${infoReg[0][3]}/${infoReg[0][4]}/${fileName}`;
    } else {
      throw 404;
    }
  }
}
