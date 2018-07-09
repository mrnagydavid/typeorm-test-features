import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SimpleEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;
}