import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryArtistDB } from './_store/mockedArtistDB';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: 'TrackStore',
      useClass: InMemoryArtistDB,
    },
  ],
})
export class ArtistsModule {}
