import { Injectable } from '@nestjs/common';
import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class InMemoryFavsDB {
  private favs: Favorite = new Favorite();

  constructor() {
    this.favs.albums = [];
    this.favs.artists = [];
    this.favs.tracks = [];
  }

  async findAll(): Promise<Favorite> {
    return this.favs;
  }

  async findInCategoryById(id: string, category: string): Promise<string> {
    return this.favs[category].find((_id: string) => _id === id);
  }

  async addToCategory(id: string, category: string): Promise<string> {
    this.favs[category].push(id);

    return id;
  }

  async removeFromCategory(id: string, category: string): Promise<string> {
    const foundId = this.findInCategoryById(id, category);
    if (!foundId) return;

    this.favs[category] = this.favs[category].filter(
      (_id: string) => _id !== id,
    );

    return id;
  }
}
