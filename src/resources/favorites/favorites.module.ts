import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryFavsDB } from './_store/mockedFavsDB';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { InMemoryAlbumDB } from '../albums/_store/mockedAlbumDB';
import { InMemoryArtistDB } from '../artists/_store/mockedArtistDB';
import { InMemoryTrackDB } from '../tracks/_store/mockedTrackDB';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    AlbumsService,
    ArtistsService,
    TracksService,
    {
      provide: 'FavoriteStore',
      useClass: InMemoryFavsDB,
    },
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumDB,
    },
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
export class FavoritesModule {}
