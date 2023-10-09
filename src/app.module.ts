import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity, FAQEntity, TestimonialEntity, UserEntity } from './app.entity';

@Module({
  imports: [TypeOrmModule.forRoot(
  {
    type: 'mysql',
    host: "localhost",
    port: 8000,
    username: "root",
    password: "",
    database: "bpa",
    entities:[ContactEntity, FAQEntity, TestimonialEntity, UserEntity],
    synchronize: true,
  }),TypeOrmModule.forFeature([ContactEntity, FAQEntity, TestimonialEntity, UserEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
