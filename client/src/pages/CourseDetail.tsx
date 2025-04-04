
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

// Mock course data
const coursesData = {
  '1': {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'This comprehensive course covers everything you need to know to get started with web development. From the basics of HTML and CSS to advanced JavaScript concepts, you\'ll learn how to build responsive, interactive websites from scratch.',
    longDescription: `
    <p>Are you interested in becoming a web developer but don't know where to start? This course is designed for complete beginners who want to learn how to build beautiful, responsive websites from scratch.</p>
    
    <p>Throughout this course, you'll learn:</p>
    <ul>
      <li>The fundamentals of HTML5 and how to structure web content properly</li>
      <li>CSS3 techniques for styling and layouts, including flexbox and grid</li>
      <li>JavaScript basics and DOM manipulation to add interactivity</li>
      <li>Responsive design principles to ensure your sites work on mobile, tablet, and desktop</li>
      <li>Best practices for web accessibility and performance</li>
      <li>How to deploy your websites to the internet</li>
    </ul>
    
    <p>By the end of this course, you'll have built several real-world projects that you can add to your portfolio, and you'll have the skills needed to start your journey as a web developer.</p>
    `,
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Development',
    level: 'Beginner',
    instructorName: 'Sarah Johnson',
    instructorTitle: 'Senior Frontend Developer at TechCorp',
    instructorBio: 'Sarah has over 10 years of experience in web development and has taught over 50,000 students. She specializes in making complex topics easy to understand for beginners.',
    instructorAvatar: 'https://i.pravatar.cc/150?img=1',
    price: 49.99,
    rating: 4.8,
    reviewCount: 342,
    studentsCount: 12504,
    duration: '12 hours',
    lastUpdated: 'August 2023',
    isPremium: true,
    curriculum: [
      {
        id: 'section1',
        title: 'Getting Started with HTML',
        lessons: [
          {
            id: 'lesson1',
            title: 'Introduction to HTML',
            duration: '15:30',
            isPreview: true,
          },
          {
            id: 'lesson2',
            title: 'HTML Document Structure',
            duration: '12:45',
            isPreview: false,
          },
          {
            id: 'lesson3',
            title: 'Working with Text Elements',
            duration: '18:20',
            isPreview: false,
          },
          {
            id: 'lesson4',
            title: 'Links and Images',
            duration: '14:10',
            isPreview: false,
          },
        ],
      },
      {
        id: 'section2',
        title: 'Styling with CSS',
        lessons: [
          {
            id: 'lesson5',
            title: 'Introduction to CSS',
            duration: '16:15',
            isPreview: true,
          },
          {
            id: 'lesson6',
            title: 'Selectors and Properties',
            duration: '20:30',
            isPreview: false,
          },
          {
            id: 'lesson7',
            title: 'Box Model',
            duration: '18:45',
            isPreview: false,
          },
          {
            id: 'lesson8',
            title: 'Flexbox Layout',
            duration: '25:10',
            isPreview: false,
          },
          {
            id: 'lesson9',
            title: 'CSS Grid',
            duration: '22:30',
            isPreview: false,
          },
        ],
      },
      {
        id: 'section3',
        title: 'JavaScript Basics',
        lessons: [
          {
            id: 'lesson10',
            title: 'Introduction to JavaScript',
            duration: '18:20',
            isPreview: true,
          },
          {
            id: 'lesson11',
            title: 'Variables and Data Types',
            duration: '14:45',
            isPreview: false,
          },
          {
            id: 'lesson12',
            title: 'Functions and Control Flow',
            duration: '22:15',
            isPreview: false,
          },
          {
            id: 'lesson13',
            title: 'DOM Manipulation',
            duration: '26:30',
            isPreview: false,
          },
          {
            id: 'lesson14',
            title: 'Events and Event Handling',
            duration: '19:50',
            isPreview: false,
          },
        ],
      },
    ],
    requirements: [
      'A computer with an internet connection',
      'No prior programming experience needed',
      'Basic computer skills',
      'Any operating system (Windows, Mac, or Linux)',
    ],
    whatYouWillLearn: [
      'Build responsive websites using HTML, CSS, and JavaScript',
      'Create layouts with Flexbox and CSS Grid',
      'Implement interactive features with JavaScript',
      'Optimize websites for different devices and screen sizes',
      'Deploy websites to a live server',
      'Understand web development best practices',
    ],
  },
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real application, you would fetch the course data based on the ID
  const course = coursesData[id as keyof typeof coursesData] || coursesData['1'];
  
  // Calculate course stats
  const totalLessons = course.curriculum.reduce((total, section) => total + section.lessons.length, 0);
  const totalDuration = course.curriculum.reduce((total, section) => {
    return total + section.lessons.reduce((sectionTotal, lesson) => {
      const [minutes, seconds] = lesson.duration.split(':').map(Number);
      return sectionTotal + minutes + seconds / 60;
    }, 0);
  }, 0);
  
  const formattedTotalDuration = `${Math.floor(totalDuration)} hours ${Math.round((totalDuration % 1) * 60)} minutes`;
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Course Hero Section */}
        <div className="bg-muted/30 py-12">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <Badge className="mb-4">{course.category}</Badge>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{course.title}</h1>
                <p className="mt-4 text-muted-foreground">{course.description}</p>
                
                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-yellow-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <span>
                      <strong>{course.rating}</strong> ({course.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <span>{course.studentsCount.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>{formattedTotalDuration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    <span>Last updated: {course.lastUpdated}</span>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg">Enroll Now - ${course.price}</Button>
                  <Button size="lg" variant="outline">Try for Free</Button>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content Tabs */}
        <div className="container py-12">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mt-8">
              <TabsContent value="overview" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  <div dangerouslySetInnerHTML={{ __html: course.longDescription }} className="prose max-w-none dark:prose-invert" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <ul className="list-disc ml-6 space-y-2">
                    {course.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Stats</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">{totalLessons}</div>
                          <p className="text-sm text-muted-foreground mt-1">Lessons</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">{course.curriculum.length}</div>
                          <p className="text-sm text-muted-foreground mt-1">Modules</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">{course.duration}</div>
                          <p className="text-sm text-muted-foreground mt-1">Total Hours</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">{course.level}</div>
                          <p className="text-sm text-muted-foreground mt-1">Level</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <div>{course.curriculum.length} sections</div>
                    <div>•</div>
                    <div>{totalLessons} lectures</div>
                    <div>•</div>
                    <div>{formattedTotalDuration} total length</div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {course.curriculum.map((section, index) => (
                      <AccordionItem key={section.id} value={section.id}>
                        <AccordionTrigger className="hover:bg-muted/50 px-4 -mx-4 py-2 rounded-lg">
                          <div className="flex flex-1 items-center justify-between pr-2">
                            <div className="text-left">
                              <div className="font-medium">Section {index + 1}: {section.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {section.lessons.length} lessons • {calculateSectionDuration(section.lessons)}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-0">
                          <div className="space-y-2">
                            {section.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                  </svg>
                                  <span>{lesson.title}</span>
                                  {lesson.isPreview && (
                                    <Badge variant="outline" className="ml-2">Preview</Badge>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Meet Your Instructor</h2>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <Avatar className="h-32 w-32 mx-auto md:mx-0">
                        <AvatarImage src={course.instructorAvatar} alt={course.instructorName} />
                        <AvatarFallback>{course.instructorName[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold">{course.instructorName}</h3>
                      <p className="text-muted-foreground">{course.instructorTitle}</p>
                      
                      <div className="flex flex-wrap gap-4 my-4">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                          </svg>
                          <span>12 Courses</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                          </svg>
                          <span>50,000+ Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                          </svg>
                          <span>4.8 Instructor Rating</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <p className="leading-relaxed">
                        {course.instructorBio}
                      </p>
                      
                      <div className="mt-6">
                        <Button variant="outline">View Full Profile</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <div className="rounded-lg border bg-card p-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold">{course.rating}</div>
                          <div className="flex justify-center mt-2">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(course.rating) 
                                    ? 'text-yellow-500' 
                                    : i < course.rating 
                                    ? 'text-yellow-500' 
                                    : 'text-muted'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Course Rating • {course.reviewCount} Reviews
                          </p>
                        </div>
                        
                        <div className="mt-6 space-y-3">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            // Mock percentage distribution based on overall rating
                            let percentage;
                            if (rating === 5) percentage = 70;
                            else if (rating === 4) percentage = 20;
                            else if (rating === 3) percentage = 7;
                            else if (rating === 2) percentage = 2;
                            else percentage = 1;
                            
                            return (
                              <div key={rating} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-24">
                                  <span>{rating}</span>
                                  <svg className="h-4 w-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </div>
                                <Progress value={percentage} className="h-2 flex-1" />
                                <div className="w-12 text-right text-sm text-muted-foreground">
                                  {percentage}%
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        {/* Mock reviews */}
                        {[
                          {
                            id: 1,
                            rating: 5,
                            content: "This course exceeded my expectations! The instructor explains concepts in a clear and concise manner, making complex topics easy to understand. The practical examples were extremely helpful.",
                            author: "Michael D.",
                            date: "2 weeks ago",
                            avatar: "https://i.pravatar.cc/150?img=8",
                          },
                          {
                            id: 2,
                            rating: 5,
                            content: "I started this course with zero knowledge of web development and now I feel confident building my own websites. The projects are well-designed and challenging in just the right way. Highly recommend!",
                            author: "Jessica L.",
                            date: "1 month ago",
                            avatar: "https://i.pravatar.cc/150?img=5",
                          },
                          {
                            id: 3,
                            rating: 4,
                            content: "Great content overall. The instructor is very knowledgeable and presents the material well. I would have liked more advanced exercises toward the end, but still very much worth the time and money.",
                            author: "Robert K.",
                            date: "2 months ago",
                            avatar: "https://i.pravatar.cc/150?img=11",
                          },
                        ].map((review) => (
                          <div key={review.id} className="rounded-lg border bg-card p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src={review.avatar} alt={review.author} />
                                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{review.author}</div>
                                  <div className="text-xs text-muted-foreground">{review.date}</div>
                                </div>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-muted'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="mt-4">{review.content}</p>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full">View All Reviews</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper function to calculate section duration
function calculateSectionDuration(lessons: { duration: string }[]): string {
  const totalMinutes = lessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(':').map(Number);
    return total + minutes + seconds / 60;
  }, 0);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export default CourseDetail;
