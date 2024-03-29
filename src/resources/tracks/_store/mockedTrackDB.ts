import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class InMemoryTrackDB {
  private tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findById(id: string): Promise<Track> {
    return this.tracks.find(({ id: _id }) => _id === id);
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = {
      ...createTrackDto,
      id: uuidv4(),
    };
    this.tracks.push(track);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const foundTrack = await this.findById(id);
    if (!foundTrack) return;

    const updatedTrack: Track = {
      ...foundTrack,
      ...updateTrackDto,
    };

    this.tracks = this.tracks.filter(({ id }) => id !== updatedTrack.id);
    this.tracks.push(updatedTrack);

    return updatedTrack;
  }

  async delete(id: string): Promise<Track> {
    const trackToRemove = await this.findById(id);
    if (!trackToRemove) return;

    this.tracks = this.tracks.filter(({ id: _id }) => _id !== id);

    return trackToRemove;
  }

  async findByIds(ids: string[]): Promise<Track[]> {
    return this.tracks.filter(({ id }) => ids.includes(id));
  }

  async findAllByKeyId(id: string, key: string): Promise<Track[]> {
    return this.tracks.filter((track) => track[key] === id);
  }

  async nullFieldIdFromTracks(id: string, key: string): Promise<void> {
    const tracksByKeyId = await this.findAllByKeyId(id, key);
    tracksByKeyId.forEach((track) => {
      this.update(track.id, {
        ...track,
        [key]: null,
      });
    });
  }
}
