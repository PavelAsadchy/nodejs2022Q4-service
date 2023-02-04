import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUserDB } from './_store/mockedUserDb';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserStore',
      useClass: InMemoryUserDB,
    },
  ],
})
export class UsersModule {}
