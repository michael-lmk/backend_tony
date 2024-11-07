import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1728734342834 implements MigrationInterface {
    name = 'AddUser1728734342834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(500) NOT NULL, \`password\` varchar(255) NOT NULL, \`date_insert\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`date_updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`music\` DROP FOREIGN KEY \`FK_4a7411899ab5b535ac27d091856\``);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`date_insert\` \`date_insert\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`date_updated\` \`date_updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`music\` ADD CONSTRAINT \`FK_4a7411899ab5b535ac27d091856\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`music\` DROP FOREIGN KEY \`FK_4a7411899ab5b535ac27d091856\``);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`date_updated\` \`date_updated\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`music\` CHANGE \`date_insert\` \`date_insert\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`music\` ADD CONSTRAINT \`FK_4a7411899ab5b535ac27d091856\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
