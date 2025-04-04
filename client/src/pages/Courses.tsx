
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard, { CourseCardProps } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Mock data for courses
const courseData: CourseCardProps[] = [
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
  {
    id: '5',
    title: 'Advanced JavaScript Programming',
    description: 'Take your JavaScript skills to the next level with advanced concepts and frameworks.',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2106&q=80',
    category: 'Development',
    instructorName: 'Michael Johnson',
    instructorAvatar: '/placeholder.svg',
    duration: '18 hours',
    lessons: 32,
    isPremium: true,
  },
  {
    id: '6',
    title: 'Photography Fundamentals',
    description: 'Learn the basics of photography, from composition to lighting and editing.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    category: 'Photography',
    instructorName: 'Jessica Adams',
    instructorAvatar: '/placeholder.svg',
    duration: '8 hours',
    lessons: 16,
  },
  {
    id: '7',
    title: 'Content Creation for Social Media',
    description: 'Create engaging content for various social media platforms to grow your audience.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    category: 'Marketing',
    instructorName: 'Ryan Mitchell',
    instructorAvatar: '/placeholder.svg',
    duration: '10 hours',
    lessons: 20,
  },
  {
    id: '8',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning algorithms and their applications.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Data Science',
    instructorName: 'Sophia Wang',
    instructorAvatar: '/placeholder.svg',
    duration: '16 hours',
    lessons: 28,
    isPremium: true,
  },
];

const categories = ['All Categories', 'Development', 'Data Science', 'Design', 'Marketing', 'Photography'];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  
  const filteredCourses = courseData.filter(course => {
    // Filter by search query
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    
    // Filter by premium status
    const matchesPremium = !showPremiumOnly || course.isPremium;
    
    return matchesSearch && matchesCategory && matchesPremium;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-16">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse Courses</h1>
            <p className="mt-4 text-muted-foreground">
              Discover our collection of high-quality courses to advance your skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="rounded-lg border bg-card p-6 sticky top-24">
                <h3 className="text-lg font-medium mb-4">Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <Input
                      id="search"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={selectedCategory} 
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger id="category" className="mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="premium" 
                      checked={showPremiumOnly}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          setShowPremiumOnly(checked);
                        }
                      }}
                    />
                    <Label htmlFor="premium">Premium Courses Only</Label>
                  </div>
                  
                  <Button className="w-full" onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
                    setShowPremiumOnly(false);
                  }}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategory !== 'All Categories' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory('All Categories')}
                      className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                )}
                {showPremiumOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Premium Only
                    <button 
                      onClick={() => setShowPremiumOnly(false)}
                      className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                )}
              </div>
              
              {filteredCourses.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium">No courses found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
