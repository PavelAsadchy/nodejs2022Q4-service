import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InMemoryArtistDB } from './_store/mockedArtistDB';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistStore')
    private readonly artistRepository: InMemoryArtistDB,
    private readonly trackService: TracksService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = await this.artistRepository.create(createArtistDto);

    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    const artists = await this.artistRepository.findAll();

    return artists;
  }

  async findOne(id: string, handleNotFoundExeption = true): Promise<Artist> {
    const foundArtist = await this.artistRepository.findById(id);
    if (!foundArtist && handleNotFoundExeption)
      throw new NotFoundException(`Artist with ${id} not found`);

    return foundArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const updatedArtist = await this.artistRepository.update(
      id,
      updateArtistDto,
    );
    if (!updatedArtist)
      throw new NotFoundException(`Artist with ${id} not found`);

    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    const removedArtist = await this.artistRepository.delete(id);
    if (!removedArtist)
      throw new NotFoundException(`Artist with ${id} not found`);

    await this.trackService.nullFieldIdFromTracks(id, 'artistId');
  }

  async findByIds(ids: string[]): Promise<Artist[]> {
    const foundAlbums = await this.artistRepository.findByIds(ids);

    return foundAlbums;
  }
}
