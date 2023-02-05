import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InMemoryAlbumDB } from './_store/mockedAlbumDB';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject('AlbumStore')
    private readonly albumRepository: InMemoryAlbumDB,
    private readonly trackService: TracksService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = await this.albumRepository.create(createAlbumDto);

    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    const artists = await this.albumRepository.findAll();

    return artists;
  }

  async findOne(id: string, handleNotFoundExeption = true): Promise<Album> {
    const foundAlbum = await this.albumRepository.findById(id);
    if (!foundAlbum && handleNotFoundExeption)
      throw new NotFoundException(`Album with ${id} not found`);

    return foundAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const updatedAlbum = await this.albumRepository.update(id, updateAlbumDto);
    if (!updatedAlbum)
      throw new NotFoundException(`Album with ${id} not found`);

    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    const removedAlbum = await this.albumRepository.delete(id);
    if (!removedAlbum)
      throw new NotFoundException(`Album with ${id} not found`);

    await this.trackService.nullFieldIdFromTracks(id, 'albumId');
  }

  async findByIds(ids: string[]): Promise<Album[]> {
    const foundAlbums = await this.albumRepository.findByIds(ids);

    return foundAlbums;
  }
}
