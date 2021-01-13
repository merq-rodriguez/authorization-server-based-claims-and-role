import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignUpDTO } from "../auth/dto/signup.dto";
import { NewUserDTO, UpdateUserDTO } from "./dto/user.dto";
import { RoleInt } from '../security/enums/role.enum';
import { Role } from "./entities/role.entity";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService{
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  private genRoles(roles: Array<number>){
    return roles.map(id => new Role(id));
  }
  
  async getUsers(): Promise<User[]>{
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User>{
    return await this.userRepository.findOne(id, {relations: ["roles"]});
  }

  async findUserByUsername(username: string): Promise<User>{
    return  await this.userRepository.findOne({where: {username}, relations: ["roles"]});
  }

  async createUser(data: NewUserDTO | SignUpDTO): Promise<User>{
    let user = new User();
    user.email = data.email;
    user.password = data.password;
    user.username = data.username;
    if(data['roles'])
      user.roles = this.genRoles(data['roles']);
    else 
      user.roles = [new Role(RoleInt.Client)]
    return await this.userRepository.save(user);
  }
  
  async updateUser(id: number, data: UpdateUserDTO): Promise<User>{
    let user = await this.findUserById(id);
    if(!user)
      throw new NotFoundException("User not found");
    
      user.email = data.email;
      user.username = data.username;
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<any>{
    this.userRepository.delete(id);
  }
}