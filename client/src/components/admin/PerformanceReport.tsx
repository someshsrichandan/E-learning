
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';

// Sample data for the performance report
const performanceData = [
  { course: 'Web Development', passRate: 78, avgScore: 82, completion: 65 },
  { course: 'Data Science', passRate: 85, avgScore: 88, completion: 70 },
  { course: 'Digital Marketing', passRate: 92, avgScore: 85, completion: 88 },
  { course: 'UX Design', passRate: 75, avgScore: 79, completion: 62 },
  { course: 'Project Management', passRate: 80, avgScore: 83, completion: 75 },
];

const chartConfig = {
  passRate: {
    label: 'Pass Rate',
    theme: {
      light: '#3f51b5',
      dark: '#5c6bc0',
    },
  },
  avgScore: {
    label: 'Avg Score',
    theme: {
      light: '#2196f3',
      dark: '#42a5f5',
    },
  },
  completion: {
    label: 'Completion',
    theme: {
      light: '#00bcd4',
      dark: '#4dd0e1',
    },
  },
};

const PerformanceReport = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Course Completion</CardTitle>
            <CardDescription>Percentage of students completing courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">72%</div>
            <Progress value={72} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Pass Rate</CardTitle>
            <CardDescription>Percentage of students passing courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">82%</div>
            <Progress value={82} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Score</CardTitle>
            <CardDescription>Average student score across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">83.4</div>
            <Progress value={83.4} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Performance Metrics</CardTitle>
          <CardDescription>
            Comparison of key performance metrics across courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig}>
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="course" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="passRate" fill="var(--color-passRate)" name="Pass Rate %" />
                <Bar dataKey="avgScore" fill="var(--color-avgScore)" name="Avg Score" />
                <Bar dataKey="completion" fill="var(--color-completion)" name="Completion %" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key observations and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Digital Marketing courses show the highest completion and pass rates.</li>
            <li>UX Design has the lowest metrics - consider reviewing course materials.</li>
            <li>Data Science has high scores but lower completion - may need better pacing.</li>
            <li>Web Development shows balanced metrics but could improve on pass rates.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceReport;
