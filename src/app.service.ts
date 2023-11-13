import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CareerEntity, ContactEntity, FAQEntity, ReplyEntity, TestimonialEntity, UserEntity } from './app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerDTO, ContactDTO, FAQDTO, TestimonialDTO } from './app.dto';
import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import * as path from 'path'; 

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    @InjectRepository(FAQEntity)
    private readonly FAQRepository: Repository<FAQEntity>,
    @InjectRepository(TestimonialEntity)
    private readonly testimonialRepository: Repository<TestimonialEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ReplyEntity)
    private readonly replyRepository: Repository<ReplyEntity>,
    @InjectRepository(CareerEntity)
    private readonly careerRepository: Repository<CareerEntity>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addContact(data: ContactDTO): Promise<ContactEntity> {
    const contact = this.contactRepository.create(data);
    console.log(contact);
    return this.contactRepository.save(contact);
  }

  async addFAQ(data: FAQDTO): Promise<FAQEntity> {
    const FAQ = this.FAQRepository.create(data);
    console.log(FAQ);
    return this.FAQRepository.save(FAQ);
  }

  async addTestimonial(data: TestimonialDTO, image:string): Promise<TestimonialEntity> {
    data.image = image;
    const testimonial = this.testimonialRepository.create(data);
    console.log(testimonial);
    return this.testimonialRepository.save(testimonial);
  }

  async addCareer(data: CareerDTO, resume:string): Promise<CareerEntity>{
    data.resume = resume;
    const career = this.careerRepository.create(data);
    console.log(career);
    return this.careerRepository.save(career);
  }
  
  async getAllContacts(): Promise<ContactEntity[]> {
    return this.contactRepository.find();
  }

  async getAllFAQs(): Promise<FAQEntity[]> {
    return this.FAQRepository.find();
  }

  async getAllFAQsGroupedByCategory(): Promise<any[]> {
    const allFAQs = await this.FAQRepository.find();
    
    // Group FAQs by category
    const groupedFAQs = allFAQs.reduce((acc, faq) => {
      const { category, question, answer } = faq;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ question, answer });
      return acc;
    }, {});

    // Transform grouped FAQs into the desired format
    const formattedFAQs = Object.keys(groupedFAQs).map((category) => ({
      category,
      questions: groupedFAQs[category],
    }));

    return formattedFAQs;
  }

  async getAllTestimonials(): Promise<TestimonialEntity[]> {
    return this.testimonialRepository.find();
  }

  async getTestImages(id: number, res: any): Promise<any> {
    const currentTestimonial = await this.testimonialRepository.findOneBy({ id: id });
    const currentTestimonialDTO: TestimonialDTO = plainToClass(TestimonialDTO, currentTestimonial);
    if (currentTestimonial) {
        const currentTestimonialDTO: TestimonialDTO = plainToClass(TestimonialDTO, currentTestimonial);
        console.log(currentTestimonialDTO);
        return res.sendFile(currentTestimonialDTO.image, {
          root: './assets/testimonials',
        });
      } else {
        return null;
      }
  }

  async addUser(data: any): Promise<any> {
    const user = this.userRepository.create(data);
    console.log(user);
    return this.userRepository.save(user);
  }

  async login(data: any): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({email: data.email, password: data.password});

    if(user){

      return user;
    }
    else{
      return null;
    }
  }

  async addReply(data: any): Promise<any> {
    const reply = this.replyRepository.create(data);
    console.log(reply);
    return this.replyRepository.save(reply);
  }

  async replytoContact(data: any): Promise<any> {
    const reply = await this.addReply(data);
    const contact = await this.contactRepository.findOneBy({id: data.contact_id});
    contact.reply = reply;
    return this.contactRepository.save(contact);
  }

}
