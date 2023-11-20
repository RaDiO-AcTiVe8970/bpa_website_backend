import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntity, CareerEntity, ContactEntity, FAQEntity, ReplyEntity, TestimonialEntity, UserEntity } from './app.entity';
import { ApplicationConfig } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forRoot(
  {
    type: 'mysql',
    host: "localhost",
    port: 8100,
    username: "root",
    password: "",
    database: "bpa",
    entities:[ApplicantEntity, ContactEntity, FAQEntity, TestimonialEntity, UserEntity, ReplyEntity, CareerEntity],
    synchronize: true,
  }),TypeOrmModule.forFeature([ApplicantEntity,ContactEntity, FAQEntity, TestimonialEntity, UserEntity, ReplyEntity, CareerEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
