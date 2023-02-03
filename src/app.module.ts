import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './resources/albums/albums.module';
import { UsersModule } from './resources/users/users.module';
import { ArtistsModule } from './resources/artists/artists.module';
import { TracksModule } from './resources/tracks/tracks.module';
import { FavoritesModule } from './resources/favorites/favorites.module';

@Module({
  imports: [
    AlbumsModule,
    UsersModule,
    ArtistsModule,
    TracksModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
