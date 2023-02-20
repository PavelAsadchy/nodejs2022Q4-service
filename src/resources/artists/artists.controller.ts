import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('Track')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The artist was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all artists',
  })
  async findAll(): Promise<Artist[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get artist by id if it exists',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'The artist not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return await this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The track was successfully updated',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'The track was not found.',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The artist was successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'The artist was not found',
  })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.artistsService.remove(id);
  }
}
