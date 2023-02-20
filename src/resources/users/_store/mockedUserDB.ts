import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryUserDB {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    return this.users.find(({ id: _id }) => _id === id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      ...createUserDto,
      id: uuidv4(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    };
    this.users.push(user);

    return user;
  }

  async updatePassword(user: User, newPassword: string): Promise<User> {
    const updatedUser: User = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    };

    this.users = this.users.filter(({ id }) => id !== updatedUser.id);
    this.users.push(updatedUser);

    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const userToRemove = await this.findById(id);
    if (!userToRemove) return;

    this.users = this.users.filter(({ id: _id }) => _id !== id);
    return userToRemove;
  }
}
