import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InMemoryTrackDB } from './_store/mockedTrackDB';

@Injectable()
export class TracksService {
  constructor(
    @Inject('TrackStore')
    private readonly trackRepository: InMemoryTrackDB,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await this.trackRepository.create(createTrackDto);

    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    const tracks = await this.trackRepository.findAll();

    return tracks;
  }

  async findOne(id: string, handleNotFoundExeption = true): Promise<Track> {
    const foundTrack = await this.trackRepository.findById(id);
    if (!foundTrack && handleNotFoundExeption)
      throw new NotFoundException(`Track with ${id} not found`);

    return foundTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const updatedTrack = await this.trackRepository.update(id, updateTrackDto);
    if (!updatedTrack)
      throw new NotFoundException(`Track with ${id} not found`);

    return updatedTrack;
  }

  async remove(id: string): Promise<void> {
    const removedTrack = await this.trackRepository.delete(id);
    if (!removedTrack)
      throw new NotFoundException(`Track with ${id} not found`);
  }

  async findByIds(ids: string[]): Promise<Track[]> {
    const foundTracks = await this.trackRepository.findByIds(ids);

    return foundTracks;
  }

  async nullFieldIdFromTracks(id: string, key: string): Promise<void> {
    await this.trackRepository.nullFieldIdFromTracks(id, key);
  }
}
