import { Entity, BaseEntity, ManyToOne, OneToMany, Column, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class Node extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @ManyToOne(() => Node, (node: Node) => node.children, { nullable: true })
  parent: Node;

  @OneToMany(() => Node, (node: Node) => node.parent, { nullable: true })
  children: Node[];

  @RelationId((node: Node) => node.parent)
  parentId: number;

  @RelationId((node: Node) => node.children)
  childrenIds: number[];

  @Column()
  name: string;
}
