
export class TestimonialDTO {
    id: number;
    name: string;
    description: string;
    image: string;
}

export class CareerDTO {
    id: number;
    name: string;
    gender: string;
    email: string;
    phone: string;
    nationality: string;
    address: string;
    resume: string;
    coverLetter: string;
}


export class FAQDTO{
    id: number;
    question: string;
    answer: string;
}

export class UserDTO{
    id: number;
    username: string;
    password: string;
}

export class ContactDTO {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}