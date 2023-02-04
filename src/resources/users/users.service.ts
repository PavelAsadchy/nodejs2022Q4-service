import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { InMemoryUserDB } from './_store/mockedUserDb';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserStore')
    private readonly userRepository: InMemoryUserDB,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(createUserDto);

    return User.toResponse(newUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users.map(User.toResponse);
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userRepository.findById(id);
    if (!foundUser) throw new NotFoundException(`User with ${id} not found`);

    return User.toResponse(foundUser);
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const foundUser = await this.userRepository.findById(id);
    if (!foundUser) throw new NotFoundException(`User with ${id} not found`);

    if (foundUser.password !== oldPassword)
      throw new ForbiddenException(`User with ${id} not found`);

    const updatedUser = await this.userRepository.updatePassword(
      foundUser,
      newPassword,
    );

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const removedUser = await this.userRepository.delete(id);
    if (!removedUser) throw new NotFoundException(`User with ${id} not found`);
  }
}
