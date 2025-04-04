
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminFooter from '@/components/admin/AdminFooter';
import { Users, FileText, BookOpen, BarChart3 } from 'lucide-react';

const AdminPortal = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Portal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management Card */}
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage faculty and student accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create, update, or remove faculty and student accounts. View detailed information and modify access permissions.
              </p>
            </CardContent>
            <CardFooter>
              <Link 
                to="/admin/users" 
                className="w-full text-center py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Manage Users
              </Link>
            </CardFooter>
          </Card>
          
          {/* Reports Card */}
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Reports
              </CardTitle>
              <CardDescription>
                View student performance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate and analyze detailed reports on student performance. Track progress, grades, and course completion metrics.
              </p>
            </CardContent>
            <CardFooter>
              <Link 
                to="/admin/reports" 
                className="w-full text-center py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                View Reports
              </Link>
            </CardFooter>
          </Card>
          
          {/* Courses Card */}
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Courses
              </CardTitle>
              <CardDescription>
                Manage course content and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create and update courses, manage enrollment, and configure course settings.
              </p>
            </CardContent>
            <CardFooter>
              <Link 
                to="/courses" 
                className="w-full text-center py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Manage Courses
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminPortal;
