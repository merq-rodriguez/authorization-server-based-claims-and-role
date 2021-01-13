import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { JwtAuthConfigService } from "src/common/providers/jwt-auth.service";
import { PassportConfigService } from "src/common/providers/passport-config.service";
import { Role } from "../users/entities/role.entity";
import { User } from "../users/entities/user.entity";
import { UserService } from "../users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),

    PassportModule.registerAsync({
      imports: [CommonModule],
      useClass: PassportConfigService
    }),
   JwtModule.registerAsync({
     imports: [CommonModule],
     useClass: JwtAuthConfigService
   }),
  ],
  controllers:[AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule{}