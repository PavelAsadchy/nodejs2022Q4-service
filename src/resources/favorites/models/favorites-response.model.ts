import { Album } from 'src/resources/albums/entities/album.entity';
import { Artist } from 'src/resources/artists/entities/artist.entity';
import { Track } from 'src/resources/tracks/entities/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
