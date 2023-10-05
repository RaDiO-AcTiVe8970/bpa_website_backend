import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ContactEntity, FAQEntity, TestimonialEntity } from './app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDTO, FAQDTO, TestimonialDTO } from './app.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    @InjectRepository(FAQEntity)
    private readonly FAQRepository: Repository<FAQEntity>,
    @InjectRepository(TestimonialEntity)
    private readonly testimonialRepository: Repository<TestimonialEntity>,
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

  async addTestimonial(data: TestimonialDTO): Promise<TestimonialEntity> {
    const testimonial = this.testimonialRepository.create(data);
    console.log(testimonial);
    return this.testimonialRepository.save(testimonial);
  }
  
  async getAllContacts(): Promise<ContactEntity[]> {
    return this.contactRepository.find();
  }

  async getAllFAQs(): Promise<FAQEntity[]> {
    return this.FAQRepository.find();
  }

  async getAllTestimonials(): Promise<TestimonialEntity[]> {
    return this.testimonialRepository.find();
  }

}
