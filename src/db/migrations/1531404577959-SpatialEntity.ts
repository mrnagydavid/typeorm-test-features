import {MigrationInterface, QueryRunner} from "typeorm";

export class SpatialEntity1531404577959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `spatial_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `geom` geometry NOT NULL, `radius` float NOT NULL, SPATIAL INDEX `IDX_fba119f030180c550a495d8d8f` (`geom`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_fba119f030180c550a495d8d8f` ON `spatial_entity`");
        await queryRunner.query("DROP TABLE `spatial_entity`");
    }

}
