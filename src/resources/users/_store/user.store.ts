import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserStore {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    });

    return await this.userRepository.save(user);
  }

  async updatePassword(user: User, newPassword: string): Promise<User> {
    const updatedUser: User = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    };

    return await this.userRepository.save(updatedUser);
  }

  async delete(id: string): Promise<User> {
    const userToRemove = await this.userRepository.findOne({ where: { id } });
    if (!userToRemove) return;

    return await this.userRepository.remove(userToRemove);
  }
}
