
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const instructors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    title: 'Computer Science Professor',
    bio: 'Specializes in artificial intelligence and machine learning with over 10 years of teaching experience.',
    courses: 12,
    students: 2400,
    rating: 4.8,
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Prof. David Chen',
    title: 'Data Science Expert',
    bio: 'Former industry leader with expertise in big data and analytics. Passionate about practical applications of data science.',
    courses: 8,
    students: 1900,
    rating: 4.7,
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'UX/UI Design Instructor',
    bio: 'Award-winning designer with a focus on user-centered design principles and accessibility.',
    courses: 6,
    students: 1500,
    rating: 4.9,
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Michael Williams',
    title: 'Full Stack Developer',
    bio: 'Professional developer with experience at top tech companies. Teaches modern web development frameworks and best practices.',
    courses: 10,
    students: 2100,
    rating: 4.6,
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Dr. Aisha Patel',
    title: 'Mathematics Professor',
    bio: 'PhD in Applied Mathematics with research focus on mathematical modeling and statistics for real-world applications.',
    courses: 7,
    students: 1650,
    rating: 4.7,
    image: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Robert Kim',
    title: 'Digital Marketing Specialist',
    bio: 'Marketing professional with experience across various industries. Expert in SEO, content marketing, and social media strategy.',
    courses: 5,
    students: 1800,
    rating: 4.8,
    image: '/placeholder.svg'
  }
];

const Instructors = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Meet Our Expert Instructors</h1>
          <p className="text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Learn from industry professionals and academic experts with years of experience and passion for teaching.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => (
              <Card key={instructor.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                      <AvatarImage src={instructor.image} alt={instructor.name} />
                      <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{instructor.name}</CardTitle>
                      <CardDescription>{instructor.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">{instructor.bio}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{instructor.courses}</p>
                      <p className="text-muted-foreground">Courses</p>
                    </div>
                    <div>
                      <p className="font-medium">{instructor.students.toLocaleString()}</p>
                      <p className="text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <p className="font-medium">{instructor.rating}/5</p>
                      <p className="text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">View Courses</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Instructors;
