import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFk1726070974232 implements MigrationInterface {
    name = 'AddFk1726070974232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`category\` \`categoryId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`music\` ADD CONSTRAINT \`FK_4a7411899ab5b535ac27d091856\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`music\` DROP FOREIGN KEY \`FK_4a7411899ab5b535ac27d091856\``);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`categoryId\` \`categoryId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`categoryId\` \`category\` int NOT NULL`);
    }

}
