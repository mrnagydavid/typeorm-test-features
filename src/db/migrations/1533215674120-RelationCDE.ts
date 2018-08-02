import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationCDE1533215674120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `relation_e` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `relation_c` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `relationAId` int NULL, `relationEId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `relation_d` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `relationAId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `spatial_entity` CHANGE `radius` `radius` float NOT NULL");
        await queryRunner.query("ALTER TABLE `relation_c` ADD CONSTRAINT `FK_bd236cb94779d5462ea36cf5c3d` FOREIGN KEY (`relationAId`) REFERENCES `relation_a`(`id`)");
        await queryRunner.query("ALTER TABLE `relation_c` ADD CONSTRAINT `FK_df86b851f8ed5259c1dd49b371d` FOREIGN KEY (`relationEId`) REFERENCES `relation_e`(`id`)");
        await queryRunner.query("ALTER TABLE `relation_d` ADD CONSTRAINT `FK_3b077b4f81d3ecf8557f7cb7799` FOREIGN KEY (`relationAId`) REFERENCES `relation_a`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `relation_d` DROP FOREIGN KEY `FK_3b077b4f81d3ecf8557f7cb7799`");
        await queryRunner.query("ALTER TABLE `relation_c` DROP FOREIGN KEY `FK_df86b851f8ed5259c1dd49b371d`");
        await queryRunner.query("ALTER TABLE `relation_c` DROP FOREIGN KEY `FK_bd236cb94779d5462ea36cf5c3d`");
        await queryRunner.query("ALTER TABLE `spatial_entity` CHANGE `radius` `radius` float(12) NOT NULL");
        await queryRunner.query("DROP TABLE `relation_d`");
        await queryRunner.query("DROP TABLE `relation_c`");
        await queryRunner.query("DROP TABLE `relation_e`");
    }

}
