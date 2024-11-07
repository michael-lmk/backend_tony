import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  date_insert: Date;

  @UpdateDateColumn()
  date_updated: Date;
}
