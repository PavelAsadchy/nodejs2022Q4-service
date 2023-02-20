import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryArtistDB } from './_store/mockedArtistDB';
import { TracksService } from '../tracks/tracks.service';
import { InMemoryTrackDB } from '../tracks/_store/mockedTrackDB';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    TracksService,
    {
      provide: 'ArtistStore',
      useClass: InMemoryArtistDB,
    },
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackDB,
    },
  ],
})
export class ArtistsModule {}
