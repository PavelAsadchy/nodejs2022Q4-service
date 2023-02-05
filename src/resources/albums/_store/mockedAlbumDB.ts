import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';

@Injectable()
export class InMemoryAlbumDB {
  private albums: Album[];

  constructor() {
    this.albums = [];
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findById(id: string): Promise<Album> {
    return this.albums.find(({ id: _id }) => _id === id);
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      ...createAlbumDto,
      id: uuidv4(),
    };
    this.albums.push(album);

    return album;
  }

  async update(id: string, updateArtistDto: UpdateAlbumDto): Promise<Album> {
    const foundAlbum = await this.findById(id);
    if (!foundAlbum) return;

    const updatedAlbum: Album = {
      ...foundAlbum,
      ...updateArtistDto,
    };

    this.albums = this.albums.filter(({ id }) => id !== updatedAlbum.id);
    this.albums.push(updatedAlbum);

    return updatedAlbum;
  }

  async delete(id: string): Promise<Album> {
    const albumToRemove = await this.findById(id);
    if (!albumToRemove) return;

    this.albums = this.albums.filter(({ id: _id }) => _id !== id);
    return albumToRemove;
  }

  async findByIds(ids: string[]): Promise<Album[]> {
    const albums = this.albums.filter(({ id }) => ids.includes(id));

    return albums;
  }
}
