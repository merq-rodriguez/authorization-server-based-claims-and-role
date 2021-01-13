import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission";

@Entity()
export class Role{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Permission)
  @JoinTable({
    name: 'privilege',
    joinColumn: {name: 'role_id'},
    inverseJoinColumn: {name: 'permission_id'}
  })
  permissions: Permission[]

  constructor(id: number){
    this.id = id;
  }
}