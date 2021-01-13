
import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    });
  }
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }

    handleRequest(err, user, info, ctx) {
      if (err || !user)
        throw err || new UnauthorizedException('Invalid credentials');
      return user;
    }
}