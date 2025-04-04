
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Search } from 'lucide-react';

// Sample student progress data
const studentsProgressData = [
  { id: 1, name: 'Emma Wilson', email: 'emma@example.com', coursesCompleted: 4, coursesEnrolled: 5, avgScore: 92, lastActive: '2023-04-01' },
  { id: 2, name: 'Michael Johnson', email: 'michael@example.com', coursesCompleted: 2, coursesEnrolled: 6, avgScore: 78, lastActive: '2023-04-02' },
  { id: 3, name: 'Sophia Davis', email: 'sophia@example.com', coursesCompleted: 5, coursesEnrolled: 5, avgScore: 95, lastActive: '2023-04-01' },
  { id: 4, name: 'Daniel Brown', email: 'daniel@example.com', coursesCompleted: 3, coursesEnrolled: 8, avgScore: 84, lastActive: '2023-03-28' },
  { id: 5, name: 'Olivia Miller', email: 'olivia@example.com', coursesCompleted: 1, coursesEnrolled: 4, avgScore: 73, lastActive: '2023-03-30' },
  { id: 6, name: 'James Wilson', email: 'james@example.com', coursesCompleted: 6, coursesEnrolled: 10, avgScore: 88, lastActive: '2023-04-03' },
  { id: 7, name: 'Ava Smith', email: 'ava@example.com', coursesCompleted: 0, coursesEnrolled: 3, avgScore: 65, lastActive: '2023-03-25' },
];

const StudentProgress = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStudents = studentsProgressData.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Student Progress</CardTitle>
          <CardDescription>
            Track course completion and performance for individual students
          </CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course Progress</TableHead>
                <TableHead>Avg. Score</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const progressPercentage = Math.round((student.coursesCompleted / student.coursesEnrolled) * 100);
                
                return (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={progressPercentage} className="h-2 w-32" />
                        <span className="text-sm font-medium">{progressPercentage}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {student.coursesCompleted} of {student.coursesEnrolled} courses
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${
                        student.avgScore >= 90 ? 'text-green-600' :
                        student.avgScore >= 75 ? 'text-blue-600' :
                        student.avgScore >= 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {student.avgScore}%
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(student.lastActive).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No students found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgress;
