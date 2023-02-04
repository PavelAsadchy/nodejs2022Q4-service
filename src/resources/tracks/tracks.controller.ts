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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The track was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all tracks',
  })
  async findAll(): Promise<Track[]> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get track by id if it exists',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'The track not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return await this.tracksService.findOne(id);
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
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The track was successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'The track was not found',
  })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.tracksService.remove(id);
  }
}
