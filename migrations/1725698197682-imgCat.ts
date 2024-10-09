import { MigrationInterface, QueryRunner } from "typeorm";

export class ImgCat1725698197682 implements MigrationInterface {
    name = 'ImgCat1725698197682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`image\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`image\``);
    }

}
