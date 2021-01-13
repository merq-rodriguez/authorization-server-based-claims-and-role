import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../../users/entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("auth.secret-key"),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user: User =  await this.authService.findByPayload(payload);
    if(!user)
      throw new UnauthorizedException('User not exists')

    const {password, ...result} = user;
    return result;
  }
}
