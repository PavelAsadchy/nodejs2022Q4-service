import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavoritesResponse } from './models/favorites-response.model';

@ApiTags('Favs')
@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all favorites',
  })
  async findAll(): Promise<FavoritesResponse> {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiCreatedResponse({
    description: 'The track was successfully added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Track was not found',
  })
  async addTrackToFavs(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoritesService.addTrackToFavs(id);
  }

  @Delete('track/:id')
  @ApiResponse({
    status: 204,
    description: 'The track was successfully removed from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Track is not in favorites.',
  })
  @HttpCode(204)
  async removeTrackFromFavs(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.removeTrackFromFavs(id);
  }

  @Post('album/:id')
  @ApiCreatedResponse({
    description: 'The album was successfully added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Album was not found',
  })
  async addAlbumToFavs(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoritesService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @ApiResponse({
    status: 204,
    description: 'The album was successfully removed from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Album is not in favorites.',
  })
  @HttpCode(204)
  async removeAlbumFromFavs(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.removeAlbumFromFavs(id);
  }

  @Post('artist/:id')
  @ApiCreatedResponse({
    description: 'The artist was successfully added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist was not found',
  })
  async addArtistToFavs(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoritesService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @ApiResponse({
    status: 204,
    description: 'The artist was successfully removed from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist is not in favorites.',
  })
  @HttpCode(204)
  async removeArtistFromFavs(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.removeArtistFromFavs(id);
  }
}
