import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationAB1531990902822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `relation_b` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `relationAId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `relation_a` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `spatial_entity` CHANGE `radius` `radius` float NOT NULL");
        await queryRunner.query("ALTER TABLE `relation_b` ADD CONSTRAINT `FK_9c33faabfeb2294647361d58d05` FOREIGN KEY (`relationAId`) REFERENCES `relation_a`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `relation_b` DROP FOREIGN KEY `FK_9c33faabfeb2294647361d58d05`");
        await queryRunner.query("ALTER TABLE `spatial_entity` CHANGE `radius` `radius` float(12) NOT NULL");
        await queryRunner.query("DROP TABLE `relation_a`");
        await queryRunner.query("DROP TABLE `relation_b`");
    }

}
