import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId } from "typeorm";
import { RelationA } from "./relationA";

@Entity()
export class RelationD extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => RelationA, (a: RelationA) => a.relationBs)
  public relationA: RelationA;

  @RelationId((type: RelationD) => type.relationA)
  public relationAId: number;
}