import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryAlbumDB } from './_store/mockedAlbumDB';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'TrackStore',
      useClass: InMemoryAlbumDB,
    },
  ],
})
export class AlbumsModule {}
