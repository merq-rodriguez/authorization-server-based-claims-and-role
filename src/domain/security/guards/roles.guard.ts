
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from 'src/domain/security/enums/role.enum';
import { ROLES_KEY } from '../roles.decorator';
import { Role } from '../../users/entities/role.entity';
import { User } from '../../users/entities/user.entity';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles)
      return true;

    const { user } = context.switchToHttp().getRequest();
    return this.matchRoles(requiredRoles, user);
  }

  private matchRoles(roles: Array<string>, user: User): boolean{
    const hasRole = () => user.roles.some((role: Role) => roles.find((name: string) => name === role.name))
    return user && user.roles && hasRole() && user.state;
  }
}