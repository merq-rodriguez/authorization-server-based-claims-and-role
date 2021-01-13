import { IsString, IsNotEmpty } from "class-validator";

export class SignInDTO{
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}