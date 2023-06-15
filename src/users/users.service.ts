/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { createHash } from 'crypto';


export type User = {
  userId: number,
  username: string,
  password: string,
  salt: string
};

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(userData: any): Promise<any> {
    const salt = randomBytes(16).toString('hex');
    const password = this.saltAndHash(userData.password, salt);
    const userId = Date.now();

    this.users.push({
      userId: userId,
      username: userData.username,
      password: password,
      salt
    });
    return true;
  }
  saltAndHash(password: string, salt: string): string {
    const saltedPassword = password + salt;
    return createHash('sha256').update(saltedPassword).digest('hex');
  }
}



