import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToMany(() => ReplyEntity, (reply) => reply.contact)
    reply: ReplyEntity[];
    
}

@Entity("reply")
export class ReplyEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    message: string;

    @ManyToOne(() => ContactEntity, (contact) => contact.id)
    contact: ContactEntity;
}

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
}

@Entity("career")
export class CareerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    gender: string;
    @Column()
    email: string;
    @Column()
    phone: string;
    @Column()
    nationality: string;
    @Column()
    address: string;
    @Column()
    resume: string;
    @Column()
    coverLetter: string;
}

