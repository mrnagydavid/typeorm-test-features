import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, RelationId } from "typeorm";
import { RelationC } from "./relationC";

@Entity()
export class RelationE extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => RelationC, (c: RelationC) => c.relationE)
  public relationCs: RelationC[];

  @RelationId((type: RelationE) => type.relationCs)
  public relationCIds: number[];
}


