import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import * as bcrypt from 'bcrypt';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  
  @Column()
  password: string;
  
  @Column()
  email: string;
  
  @Column({default: true})
  state: boolean;

  @Column({default: false})
  isAdmin: boolean;

  @ManyToMany(type => Role)
  @JoinTable({
    name: "user_role",
    joinColumn: {name: 'user_id'},
    inverseJoinColumn: {name: 'role_id'},
  })
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}