import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InMemoryAlbumDB } from './_store/mockedAlbumDB';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject('AlbumStore')
    private readonly albumRepository: InMemoryAlbumDB,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = await this.albumRepository.create(createAlbumDto);

    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    const artists = await this.albumRepository.findAll();

    return artists;
  }

  async findOne(id: string): Promise<Album> {
    const foundAlbum = await this.albumRepository.findById(id);
    if (!foundAlbum) throw new NotFoundException(`Album with ${id} not found`);

    return foundAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const foundAlbum = await this.albumRepository.findById(id);
    if (!foundAlbum) throw new NotFoundException(`Album with ${id} not found`);

    const updatedAlbum = await this.albumRepository.update(
      foundAlbum,
      updateAlbumDto,
    );

    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    const removedAlbum = await this.albumRepository.delete(id);
    if (!removedAlbum)
      throw new NotFoundException(`Album with ${id} not found`);
  }

  async findByIds(ids: string[]): Promise<Album[]> {
    const foundAlbums = await this.albumRepository.findByIds(ids);

    return foundAlbums;
  }
}
