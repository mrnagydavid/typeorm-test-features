import {MigrationInterface, QueryRunner} from "typeorm";

export class Graph1531988693476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `node` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `parentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `node` ADD CONSTRAINT `FK_ba001b660671bf4233abd7e7955` FOREIGN KEY (`parentId`) REFERENCES `node`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `node` DROP FOREIGN KEY `FK_ba001b660671bf4233abd7e7955`");
        await queryRunner.query("DROP TABLE `node`");
    }

}
