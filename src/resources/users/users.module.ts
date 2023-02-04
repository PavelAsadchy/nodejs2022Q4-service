import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUserDB } from './_store/mockedUserDB';

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
