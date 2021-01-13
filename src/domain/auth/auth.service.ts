import { Injectable, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { UserService } from "../users/user.service";
import { IAccessToken } from "./interfaces/access-token.interface";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "../users/entities/user.entity";
import { SignUpDTO } from "./dto/signup.dto";
import { Role } from "../users/entities/role.entity";

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthService{
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ){}

  public createToken(user: User): IAccessToken {
    const { username} = user;
    const roles = this.extractRolesAuth(user.roles);
    const accessToken =  this.jwtService.sign({username, roles } as JwtPayload);
    return {
      expiresIn: this.configService.get('auth.expiresin'),
      accessToken
    }
  }

  private extractRolesAuth(roles: Role[]){
    return roles.map(role => role.name);
  }

  async findByPayload(payload: JwtPayload): Promise<any> {
    const {username} = payload;
    return await this.userService.findUserByUsername(username);
  }

  async validateUser(username: string, password: string): Promise<User> {
    let user: User =  await this.userService.findUserByUsername(username);

    if(user){
      const isPasswordMatching = await user.comparePassword(password);
    if (isPasswordMatching) {
      const { password, ...result } = user;
      return result as User;
    }else
      return null
    }
    return null;
  }

  async signIn(user: User): Promise<any>{
    return this.createToken(user);
  }

  async signUp(data: SignUpDTO){
    const user: User = await this.userService.createUser(data);
    return this.createToken(user);
  }
}