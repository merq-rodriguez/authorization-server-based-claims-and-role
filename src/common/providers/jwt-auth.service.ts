import { Injectable } from "@nestjs/common";
import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthConfigService implements JwtOptionsFactory{
  constructor(private readonly configService: ConfigService){}
  
  createJwtOptions(): JwtModuleOptions {
    return  this.getJwtOptions();
  }

  private getJwtOptions(){
    return{
        secret: this.configService.get('auth.secret-key'),
        signOptions: { 
          expiresIn: this.configService.get('auth.expiresin')
        },
    }
  }

}