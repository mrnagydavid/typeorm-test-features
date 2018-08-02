import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { RelationA } from "./relationA";
import { RelationE } from "./relationE";

@Entity()
export class RelationC extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => RelationA, (a: RelationA) => a.relationBs, { nullable: true })
  @JoinColumn({ name: "relationAId" })
  public relationA: RelationA;

  @Column({ nullable: true })
  public relationAId: number;

  @ManyToOne(() => RelationE, (e: RelationE) => e.relationCs, { nullable: true })
  public relationE: RelationE;
}