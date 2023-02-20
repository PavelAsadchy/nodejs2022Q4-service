import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from 'src/common/config';
import { dataSourceConfig } from 'src/common/typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './resources/albums/albums.module';
import { UsersModule } from './resources/users/users.module';
import { ArtistsModule } from './resources/artists/artists.module';
import { TracksModule } from './resources/tracks/tracks.module';
import { FavoritesModule } from './resources/favorites/favorites.module';
import { AlbumsController } from './resources/albums/albums.controller';
import { UsersController } from './resources/users/users.controller';
import { ArtistsController } from './resources/artists/artists.controller';
import { TracksController } from './resources/tracks/tracks.controller';
import { FavoritesController } from './resources/favorites/favorites.controller';
import { AlbumsService } from './resources/albums/albums.service';
import { UsersService } from './resources/users/users.service';
import { ArtistsService } from './resources/artists/artists.service';
import { TracksService } from './resources/tracks/tracks.service';
import { FavoritesService } from './resources/favorites/favorites.service';
import { InMemoryFavsDB } from './resources/favorites/_store/mockedFavsDB';
import { InMemoryAlbumDB } from './resources/albums/_store/mockedAlbumDB';
import { InMemoryArtistDB } from './resources/artists/_store/mockedArtistDB';
import { InMemoryTrackDB } from './resources/tracks/_store/mockedTrackDB';
import { InMemoryUserDB } from './resources/users/_store/mockedUserDB';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => dataSourceConfig,
    }),
    AlbumsModule,
    UsersModule,
    ArtistsModule,
    TracksModule,
    FavoritesModule,
  ],
  controllers: [
    AppController,
    AlbumsController,
    UsersController,
    ArtistsController,
    TracksController,
    FavoritesController,
  ],
  providers: [
    AppService,
    AlbumsService,
    ArtistsService,
    TracksService,
    UsersService,
    FavoritesService,
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
    {
      provide: 'UserStore',
      useClass: InMemoryUserDB,
    },
  ],
})
export class AppModule {}
