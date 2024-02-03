import { Module } from '@nestjs/common';
import { PalpediaService } from './palpedia.service';
import { PalpediaController } from './palpedia.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Pal, PalSchema } from './entities/pal.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Pal.name, schema: PalSchema}]),
  ],
  controllers: [PalpediaController,],
  providers: [PalpediaService],
})
export class PalpediaModule {}
