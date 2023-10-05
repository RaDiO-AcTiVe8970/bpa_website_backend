import { BadRequestException, Body, Controller, Get, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ContactDTO, FAQDTO, TestimonialDTO } from './app.dto';
import { ContactEntity, FAQEntity, TestimonialEntity } from './app.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller("api/bpa/admin")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/index")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/addContact")
  async addContact(@Body() data:ContactDTO): Promise<ContactEntity> {
    try{
      const contact = await this.appService.addContact(data);
      return contact;
    }
    catch(err){
      console.log(err);
    }
  }

  @Get("/getAllContacts")
  async getAllContacts(): Promise<ContactEntity[]> {
    try{
      const contacts = await this.appService.getAllContacts();
      return contacts;
    }
    catch(err){
      console.log(err);
    }
  }

  @Post("/addFAQ")
  async addFAQ(@Body() data:FAQDTO): Promise<FAQEntity> {
    try{
      const FAQ = await this.appService.addFAQ(data);
      return FAQ;
    }
    catch(err){
      console.log(err);
    }
  }

  @Get("/getAllFAQs")
  async getAllFAQs(): Promise<FAQDTO[]> {
    try{
      const FAQs = await this.appService.getAllFAQs();
      return FAQs;
    }
    catch(err){
      console.log(err);
    }
  }

  @Post('/addTestimonial')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 5000000 }, // 5 MB
      storage: diskStorage({
        destination: './assets/book_images',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    })
  )
  async addTestimonial(
    @Body() data: TestimonialDTO,
    @UploadedFile() myFile: Express.Multer.File
  ): Promise<TestimonialEntity> {
    /*if (myFile == null) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Please upload a file',
      });
    }*/

    try {
      const testimonial = await this.appService.addTestimonial(data);
      return testimonial;
    } catch (err) {
      console.log(err);
      // Handle the error appropriately
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Failed to add testimonial',
      });
    }
  }

  @Get("/getAllTestimonials")
  async getAllTestimonials(): Promise<TestimonialEntity[]> {
    try{
      const testimonials = await this.appService.getAllTestimonials();
      return testimonials;
    }
    catch(err){
      console.log(err);
    }
  }
}
