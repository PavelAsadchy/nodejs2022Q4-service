import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class InMemoryArtistDB {
  private artists: Artist[];

  constructor() {
    this.artists = [];
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findById(id: string): Promise<Artist> {
    return this.artists.find(({ id: _id }) => _id === id);
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    this.artists.push(artist);

    return artist;
  }

  async update(
    artistToUpdate: Artist,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const updatedArtist: Artist = {
      ...artistToUpdate,
      ...updateArtistDto,
    };

    this.artists = this.artists.filter(({ id }) => id !== updatedArtist.id);
    this.artists.push(updatedArtist);

    return updatedArtist;
  }

  async delete(id: string): Promise<Artist> {
    const artistToRemove = await this.findById(id);
    if (!artistToRemove) return;

    this.artists = this.artists.filter(({ id: _id }) => _id !== id);
    return artistToRemove;
  }
}
