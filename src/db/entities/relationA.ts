import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { RelationB } from "./relationB";

@Entity()
export class RelationA extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => RelationB, (b: RelationB) => b.relationA, { eager: true })
  public relationBs: RelationB;
}


