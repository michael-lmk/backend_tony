import { Music } from "src/module/music/entities/music.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"

@Entity({ name: "category" })
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    image: string

    @OneToMany(() => Music, (music) => music.category)
    musics: Music[]

    @Column()
    isVisible: boolean
}