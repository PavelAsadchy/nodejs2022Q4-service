import {
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { FavsCategory } from './enums/favs-categories.enum';
import { FavoritesResponse } from './models/favorites-response.model';
import { InMemoryFavsDB } from './_store/mockedFavsDB';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FavoriteStore')
    private readonly favoriteRepository: InMemoryFavsDB,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
    private readonly trackService: TracksService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoriteRepository.findAll();
    const tracks = await this.trackService.findByIds(favorites.tracks);
    const albums = await this.albumService.findByIds(favorites.albums);
    const artists = await this.artistService.findByIds(favorites.artists);
    return { tracks, albums, artists };
  }

  async addTrackToFavs(id: string): Promise<void> {
    const track = await this.trackService.findOne(id);
    if (!track) throw new UnprocessableEntityException(id);

    const addedId = await this.favoriteRepository.addToCategory(
      id,
      FavsCategory.TRACKS,
    );
    if (!addedId) throw new ServiceUnavailableException();
  }

  async removeTrackFromFavs(id: string): Promise<void> {
    const track = await this.trackService.findOne(id);
    if (!track) throw new NotFoundException(`Track with ${id} not found`);

    const removedId = await this.favoriteRepository.removeFromCategory(
      id,
      FavsCategory.TRACKS,
    );
    if (!removedId) throw new NotFoundException(`Track with ${id} not found`);
  }

  async addAlbumToFavs(id: string): Promise<void> {
    const album = await this.albumService.findOne(id);
    if (!album) throw new UnprocessableEntityException(id);

    const addedId = await this.favoriteRepository.addToCategory(
      id,
      FavsCategory.ALBUMS,
    );
    if (!addedId) throw new ServiceUnavailableException();
  }

  async removeAlbumFromFavs(id: string): Promise<void> {
    const album = await this.albumService.findOne(id);
    if (!album) throw new NotFoundException(`Album with ${id} not found`);

    const removedId = await this.favoriteRepository.removeFromCategory(
      id,
      FavsCategory.ALBUMS,
    );
    if (!removedId) throw new NotFoundException(`Album with ${id} not found`);
  }

  async addArtistToFavs(id: string): Promise<void> {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new UnprocessableEntityException(id);

    const addedId = await this.favoriteRepository.addToCategory(
      id,
      FavsCategory.ARTISTS,
    );
    if (!addedId) throw new ServiceUnavailableException();
  }

  async removeArtistFromFavs(id: string): Promise<void> {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new NotFoundException(`Artist with ${id} not found`);

    const removedId = await this.favoriteRepository.removeFromCategory(
      id,
      FavsCategory.ARTISTS,
    );
    if (!removedId) throw new NotFoundException(`Artist with ${id} not found`);
  }
}
