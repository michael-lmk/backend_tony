
import { Category } from 'src/module/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column()
  path: string;

  @ManyToOne(() => Category)
  category: Category;

  @Column()
  date_insert: Date;

  @Column()
  date_updated: Date;

  @Column()
  is_visible: boolean;
}