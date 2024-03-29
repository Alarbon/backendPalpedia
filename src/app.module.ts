import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PalpediaModule } from './palpedia/palpedia.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PalpediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
