import { Category } from 'src/module/category/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  date_insert: Date;

  @UpdateDateColumn()
  date_updated: Date;

  @Column()
  is_visible: boolean;
}
