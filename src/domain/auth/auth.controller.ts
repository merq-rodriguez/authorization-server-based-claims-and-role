import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDTO } from "./dto/signup.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService){}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req): Promise<any>{
    return await this.authService.signIn(req.user);
  }

  @Post('signup')
  async signUp(@Body() data: SignUpDTO): Promise<any>{
    return await this.authService.signUp(data);
  }
}