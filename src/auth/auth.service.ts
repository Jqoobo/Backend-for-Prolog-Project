import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const saltedPassword = this.usersService.saltAndHash(password, user.salt);
    if (user && saltedPassword === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async register(userData: any): Promise<any> {
    return await this.usersService.create(userData);
  }
  async login(user: any): Promise<any> {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
