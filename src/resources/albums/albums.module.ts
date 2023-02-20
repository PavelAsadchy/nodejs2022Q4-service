import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryAlbumDB } from './_store/mockedAlbumDB';
import { TracksService } from '../tracks/tracks.service';
import { InMemoryTrackDB } from '../tracks/_store/mockedTrackDB';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    TracksService,
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumDB,
    },
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackDB,
    },
  ],
})
export class AlbumsModule {}
