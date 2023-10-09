import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("testimonials")
export class TestimonialEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    image: string;
}

@Entity("faq")
export class FAQEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    category: string;
    @Column()
    question: string;
    @Column()
    answer: string;
}

@Entity("contact")
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    phone: string;
    @Column()
    subject: string;
    @Column()
    company: string;
    @Column()
    message: string;
}

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
}
