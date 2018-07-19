import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { RelationA } from "./relationA";

@Entity()
export class RelationB extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => RelationA, (a: RelationA) => a.relationBs)
  public relationA: RelationA;
}