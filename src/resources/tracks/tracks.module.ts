import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryTrackDB } from './_store/mockedTrackDB';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackDB,
    },
  ],
})
export class TracksModule {}
