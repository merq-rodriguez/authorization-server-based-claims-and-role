import { Module } from "@nestjs/common";
import {ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "./config/configuration";
import { TypeOrmConfigService } from "./providers/ormconfig.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    })
  ],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService]
})
export class CommonModule{}