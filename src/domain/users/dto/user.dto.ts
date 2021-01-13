import { IsArray, IsEmail, IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class NewUserDTO{
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsEmail()
  email: string;

  @IsArray()
  roles: Array<number>
}

export class UpdateUserDTO{
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsString()
  @IsEmail()
  email: string;

  @IsArray()
  roles: Array<number>
}