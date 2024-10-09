import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {

  }

  create(createCategoryDto: any) {
    return this.categoryRepository.save(createCategoryDto)
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.find({ where: { id: id } });
  }

  async update(updateCategoryDto: any) {
    const catUpdated = await this.categoryRepository.preload(updateCategoryDto);
    return this.categoryRepository.save(catUpdated);
  }

  remove(id: number) {
    console.log(id);
    
    return this.categoryRepository.delete(id)
  }
}
