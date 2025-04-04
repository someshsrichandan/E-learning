
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CourseCardProps } from '@/components/CourseCard';

// Mock data for enrolled courses
const enrolledCourses: (CourseCardProps & { progress: number, lastAccessedDate: string })[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development, including HTML, CSS, and JavaScript.',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Development',
    instructorName: 'Sarah Johnson',
    instructorAvatar: '/placeholder.svg',
    progress: 65,
    duration: '12 hours',
    lessons: 24,
    lastAccessedDate: '2 days ago',
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data analysis, visualization, and machine learning algorithms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Data Science',
    instructorName: 'David Chen',
    instructorAvatar: '/placeholder.svg',
    progress: 30,
    duration: '15 hours',
    lessons: 30,
    lastAccessedDate: '1 week ago',
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    description: 'Learn modern marketing strategies for social media, SEO, and content creation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Marketing',
    instructorName: 'Emily Rodriguez',
    instructorAvatar: '/placeholder.svg',
    progress: 10,
    duration: '10 hours',
    lessons: 18,
    lastAccessedDate: '2 days ago',
    isPremium: true,
  },
];

// Mock data for completed courses
const completedCourses: (CourseCardProps & { completedDate: string, certificateId: string })[] = [
  {
    id: '4',
    title: 'UX/UI Design Principles',
    description: 'Create intuitive and beautiful user interfaces with modern design principles.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Design',
    instructorName: 'Alex Turner',
    instructorAvatar: '/placeholder.svg',
    progress: 100,
    duration: '14 hours',
    lessons: 26,
    completedDate: 'May 15, 2023',
    certificateId: 'CERT-12345-ABCDE',
  },
];

// Mock data for user certificates
const certificates = [
  {
    id: 'CERT-12345-ABCDE',
    title: 'UX/UI Design Principles',
    issueDate: 'May 15, 2023',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

// Mock data for user
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: 'https://i.pravatar.cc/150?img=8',
  joinDate: 'January 2023',
  enrolledCourses: 4,
  completedCourses: 1,
  activeCourses: 3,
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userData.profilePicture} alt={userData.name} />
                <AvatarFallback>{userData.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">Welcome back, {userData.name}!</h1>
                <p className="text-muted-foreground">Continue your learning journey</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
              <Button variant="outline" size="sm">Edit Profile</Button>
              <Button size="sm">Find New Courses</Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.enrolledCourses}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.activeCourses}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.completedCourses}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{certificates.length}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {enrolledCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="aspect-video w-full">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold line-clamp-1 mb-2">{course.title}</h3>
                          <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2 mb-4" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Last accessed {course.lastAccessedDate}</span>
                          </div>
                          <Button className="w-full mt-4">Continue Learning</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Certificates</h2>
                  {certificates.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {certificates.map((certificate) => (
                        <Card key={certificate.id} className="overflow-hidden">
                          <div className="aspect-video w-full relative">
                            <img 
                              src={certificate.image} 
                              alt={certificate.title} 
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                              <h3 className="font-semibold text-white">{certificate.title}</h3>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">
                                Issued: {certificate.issueDate}
                              </div>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="rounded-full bg-muted p-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                          </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No Certificates Yet</h3>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                          Complete a course to earn your first certificate.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="in-progress" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Courses In Progress</h2>
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="grid md:grid-cols-4">
                          <div className="md:col-span-1 h-full">
                            <div className="h-48 md:h-full w-full">
                              <img 
                                src={course.image} 
                                alt={course.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="md:col-span-3 p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <Badge className="mb-2">{course.category}</Badge>
                                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                              </div>
                              <div className="flex flex-col items-center mt-4 md:mt-0">
                                <div className="relative h-16 w-16">
                                  <svg className="h-16 w-16 transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="40"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="10"
                                      className="text-muted opacity-20"
                                    />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="40"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="10"
                                      strokeDasharray={251.2}
                                      strokeDashoffset={251.2 - (251.2 * course.progress) / 100}
                                      className="text-primary"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-semibold">{course.progress}%</span>
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground mt-2">
                                  Last accessed {course.lastAccessedDate}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-6">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={course.instructorAvatar} alt={course.instructorName} />
                                  <AvatarFallback>{course.instructorName[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{course.instructorName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-muted-foreground">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="text-sm text-muted-foreground">{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-muted-foreground">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                </svg>
                                <span className="text-sm text-muted-foreground">{course.lessons} Lessons</span>
                              </div>
                            </div>
                            <Button className="mt-6">Continue Learning</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-muted p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-lg font-medium">No Courses In Progress</h3>
                      <p className="mt-2 text-center text-sm text-muted-foreground">
                        Explore our course catalog to find courses that interest you.
                      </p>
                      <Button className="mt-4">Browse Courses</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Completed Courses</h2>
                {completedCourses.length > 0 ? (
                  <div className="space-y-6">
                    {completedCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="grid md:grid-cols-4">
                          <div className="md:col-span-1 h-full">
                            <div className="h-48 md:h-full w-full">
                              <img 
                                src={course.image} 
                                alt={course.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="md:col-span-3 p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <Badge className="mb-2">{course.category}</Badge>
                                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                              </div>
                              <div className="flex flex-col items-center mt-4 md:mt-0">
                                <div className="rounded-full bg-primary/10 p-2 text-primary">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>
                                </div>
                                <div className="text-sm text-muted-foreground mt-2">
                                  Completed on {course.completedDate}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-6">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={course.instructorAvatar} alt={course.instructorName} />
                                  <AvatarFallback>{course.instructorName[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{course.instructorName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-muted-foreground">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="text-sm text-muted-foreground">{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-muted-foreground">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                </svg>
                                <span className="text-sm text-muted-foreground">{course.lessons} Lessons</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-muted-foreground">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                </svg>
                                <span className="text-sm text-muted-foreground">Certificate: {course.certificateId}</span>
                              </div>
                            </div>
                            <div className="mt-6 flex gap-4">
                              <Button variant="outline">Review Course</Button>
                              <Button>View Certificate</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-muted p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-lg font-medium">No Completed Courses</h3>
                      <p className="mt-2 text-center text-sm text-muted-foreground">
                        You haven't completed any courses yet. Continue learning to earn your first completion!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="certificates" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Your Certificates</h2>
                {certificates.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((certificate) => (
                      <Card key={certificate.id} className="overflow-hidden">
                        <div className="aspect-[1.4/1] w-full relative">
                          <img 
                            src={certificate.image} 
                            alt={certificate.title} 
                            className="h-full w-full object-cover brightness-[0.7]"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <div className="mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Certificate of Completion</h3>
                            <div className="my-2 text-white/90">{certificate.title}</div>
                            <div className="text-sm text-white/70">Issued on {certificate.issueDate}</div>
                            <div className="text-xs text-white/70 mt-1">ID: {certificate.id}</div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm">Share</Button>
                            <Button size="sm">Download</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-muted p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                          </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No Certificates Yet</h3>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                          Complete a course to earn your first certificate.
                        </p>
                        <Button className="mt-4">Browse Courses</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
