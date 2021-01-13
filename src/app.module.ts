import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/users/user.module';
import { BookModule } from './domain/book/book.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    BookModule,
  ],
})
export class AppModule {}
