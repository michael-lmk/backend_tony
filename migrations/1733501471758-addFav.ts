import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFav1733501471758 implements MigrationInterface {
    name = 'AddFav1733501471758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_favories_music\` (\`usersId\` int NOT NULL, \`musicId\` int NOT NULL, INDEX \`IDX_d133a11b0a01cc7d5ff3d8a6d7\` (\`usersId\`), INDEX \`IDX_bc8b7b980e5f24ac69b9d50ad0\` (\`musicId\`), PRIMARY KEY (\`usersId\`, \`musicId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_favories_music\` ADD CONSTRAINT \`FK_d133a11b0a01cc7d5ff3d8a6d77\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_favories_music\` ADD CONSTRAINT \`FK_bc8b7b980e5f24ac69b9d50ad03\` FOREIGN KEY (\`musicId\`) REFERENCES \`music\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_favories_music\` DROP FOREIGN KEY \`FK_bc8b7b980e5f24ac69b9d50ad03\``);
        await queryRunner.query(`ALTER TABLE \`users_favories_music\` DROP FOREIGN KEY \`FK_d133a11b0a01cc7d5ff3d8a6d77\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc8b7b980e5f24ac69b9d50ad0\` ON \`users_favories_music\``);
        await queryRunner.query(`DROP INDEX \`IDX_d133a11b0a01cc7d5ff3d8a6d7\` ON \`users_favories_music\``);
        await queryRunner.query(`DROP TABLE \`users_favories_music\``);
    }

}
