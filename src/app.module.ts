import AppController from './app.controller';
import { Module } from '@nestjs/common';
import AppService from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/war-card-game'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
