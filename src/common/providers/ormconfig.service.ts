import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Book } from "src/domain/book/book.entity";
import { Permission } from "src/domain/users/entities/permission";
import { Role } from "../../domain/users/entities/role.entity";
import { User } from "../../domain/users/entities/user.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}
   
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.getOrmConfig() as TypeOrmModuleOptions
  }

  private getOrmConfig() {
    return {
      type: this.config.get<string>('database.type'),
      host: this.config.get<string>('database.host'),
      port: this.config.get<number>('database.port'),
      username: this.config.get<string>('database.username'),
      password: this.config.get<string>('database.password'),
      database: this.config.get<string>('database.dbname'),
      synchronize: this.config.get<boolean>('database.synchronize'),
      logging: this.config.get<boolean>('database.logging'),
      entities: [Book, User, Role, Permission],
      subscribers: []
    }
  } 
}