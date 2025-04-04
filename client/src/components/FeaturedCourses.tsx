
import React from 'react';
import { Button } from '@/components/ui/button';
import CourseCard, { CourseCardProps } from './CourseCard';
import { Link } from 'react-router-dom';

// Mock data for featured courses
const featuredCourses: CourseCardProps[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development, including HTML, CSS, and JavaScript.',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Development',
    instructorName: 'Sarah Johnson',
    instructorAvatar: '/placeholder.svg',
    duration: '12 hours',
    lessons: 24,
    isPremium: true,
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data analysis, visualization, and machine learning algorithms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Data Science',
    instructorName: 'David Chen',
    instructorAvatar: '/placeholder.svg',
    duration: '15 hours',
    lessons: 30,
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    description: 'Learn modern marketing strategies for social media, SEO, and content creation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Marketing',
    instructorName: 'Emily Rodriguez',
    instructorAvatar: '/placeholder.svg',
    duration: '10 hours',
    lessons: 18,
    isPremium: true,
  },
  {
    id: '4',
    title: 'UX/UI Design Principles',
    description: 'Create intuitive and beautiful user interfaces with modern design principles.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Design',
    instructorName: 'Alex Turner',
    instructorAvatar: '/placeholder.svg',
    duration: '14 hours',
    lessons: 26,
  },
];

const FeaturedCourses: React.FC = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Courses</h2>
          <p className="mt-4 text-muted-foreground">
            Top-rated courses selected based on student reviews and popularity
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
