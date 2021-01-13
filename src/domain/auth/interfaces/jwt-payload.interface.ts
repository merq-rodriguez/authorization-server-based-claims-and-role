
export interface JwtPayload{
  username: string;
  roles: any[];
  iat?: Date;
}