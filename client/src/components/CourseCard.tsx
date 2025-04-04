
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  instructorName: string;
  instructorAvatar?: string;
  progress?: number;
  duration: string;
  lessons: number;
  isPremium?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
  category,
  instructorName,
  instructorAvatar,
  progress,
  duration,
  lessons,
  isPremium = false,
}) => {
  return (
    <Link to={`/courses/${id}`}>
      <Card className="course-card h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden rounded-t-xl">
            <img 
              src={image} 
              alt={title} 
              className="course-card-image" 
            />
            {isPremium && (
              <div className="absolute top-2 right-2">
                <Badge variant="default" className="bg-primary">Premium</Badge>
              </div>
            )}
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary">{category}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          <div className="mt-2 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={instructorAvatar} alt={instructorName} />
              <AvatarFallback>{instructorName[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{instructorName}</span>
          </div>
          {typeof progress === 'number' && (
            <div className="mt-2">
              <div className="mb-1 flex justify-between text-xs">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {lessons} Lessons
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
