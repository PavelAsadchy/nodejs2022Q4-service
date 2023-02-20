import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string;
  albumId: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
