
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    content: "EduFlow's platform is intuitive and engaging. The courses are well-structured, and the interactive elements keep me motivated. I've already completed 3 courses!",
    author: {
      name: 'Sarah Thompson',
      role: 'Marketing Specialist',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    rating: 5,
  },
  {
    id: 2,
    content: "As an instructor, I find the course creation tools incredibly powerful yet easy to use. My students love the interactive quizzes and discussion features.",
    author: {
      name: 'Michael Rodriguez',
      role: 'Software Engineer & Instructor',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    rating: 5,
  },
  {
    id: 3,
    content: "The certification program gave me the skills to land my dream job. The content was relevant and practical. I highly recommend EduFlow to anyone looking to advance their career.",
    author: {
      name: 'Emily Chen',
      role: 'Data Analyst',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    rating: 4,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'text-yellow-400' : 'text-muted'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Students Say</h2>
          <p className="mt-4 text-muted-foreground">
            Read testimonials from our community of learners and instructors
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <StarRating rating={testimonial.rating} />
                <p className="mt-4 text-base">{testimonial.content}</p>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                    <AvatarFallback>{testimonial.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
