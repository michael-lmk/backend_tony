import { Music } from 'src/module/music/entities/music.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ length: 500 })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  rank: number;

  @ManyToMany(() => Music)
  @JoinTable()
  favories: Music;

  @CreateDateColumn()
  date_insert: Date;

  @UpdateDateColumn()
  date_updated: Date;
}
