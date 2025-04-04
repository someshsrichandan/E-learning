
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

interface AdminFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminCode: string;
}

const AdminSignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<AdminFormData>();
  const { toast } = useToast();
  
  const onSubmit = (data: AdminFormData) => {
    console.log('Admin registration data:', data);
    toast({
      title: "Admin account created",
      description: "You can now sign in with your credentials",
    });
    // In a real app, you would handle the admin registration logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Shield className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Registration</CardTitle>
          <CardDescription className="text-center">
            Create a new administrator account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  } 
                })}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  }
                })}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === watch('password') || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminCode">Admin Authorization Code</Label>
              <Input 
                id="adminCode" 
                type="text" 
                {...register('adminCode', { required: 'Admin code is required' })}
              />
              {errors.adminCode && <p className="text-xs text-destructive">{errors.adminCode.message}</p>}
            </div>
            
            <Button type="submit" className="w-full">Register Admin Account</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Already have an admin account?{' '}
            <Link to="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
          <div className="text-sm text-center text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              Return to home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSignUp;
