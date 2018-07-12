import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index } from "typeorm";

export interface IGeoCoordinate {
  latitude: number;
  longitude: number;
  radius?: number;
}

@Entity()
@Index(['geom'], { spatial: true })
export class SpatialEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column()
  public name: string;

  @Column({
    type: "geometry",
    // srid: 4326 - to be introduced in TypeORM 0.2.8 ~ though seems to have effect on postgres only
  })
  public geom: string;

  @Column({
    type: "float"
  })
  public radius: number;

  static async getContainingEntities(coordinate: IGeoCoordinate): Promise<SpatialEntity[]> {
    coordinate.radius = coordinate.radius || 0;
    return await SpatialEntity
    .createQueryBuilder("poilist")
    .where(`
      ST_Distance_Sphere(
        poilist.geom,
        GeomFromText('POINT(${coordinate.latitude} ${coordinate.longitude})')
      ) < poilist.radius + ${coordinate.radius}
    `)
    .getMany();
  }
}