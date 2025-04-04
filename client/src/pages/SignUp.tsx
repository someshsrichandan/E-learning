
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignUp = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container max-w-md">
          <Card className="animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Fill in the form below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary underline-offset-4 hover:underline">
                    terms of service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary underline-offset-4 hover:underline">
                    privacy policy
                  </Link>
                </Label>
              </div>
              <Button className="w-full" type="submit">
                Create Account
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0009 2.20001C6.48933 2.20001 2.20088 6.48939 2.20088 12C2.20088 17.5106 6.48933 21.8 12.0009 21.8C17.5124 21.8 21.8009 17.5106 21.8009 12C21.8009 6.48939 17.5124 2.20001 12.0009 2.20001Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.5582 16.2683L7.69981 13.4091C7.1998 12.9091 7.1998 12.1091 7.69981 11.6091C8.19981 11.1091 8.99984 11.1091 9.49984 11.6091L11.4999 13.6083L14.4999 10.6083C14.9999 10.1083 15.7999 10.1083 16.2999 10.6083C16.7999 11.1083 16.7999 11.9083 16.2999 12.4083L12.3582 16.2683C11.8582 16.7683 11.0582 16.7683 10.5582 16.2683Z"
                      fill="white"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline">
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.082 7.13201C16.135 5.76501 16.563 3.89401 16.412 2.00001C14.568 2.12001 12.476 3.38001 11.399 4.75001C10.427 5.97101 9.879 7.85201 10.071 9.66101C12.049 9.73701 14.028 8.49901 15.082 7.13201Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.8002 17.1966C21.1528 16.427 21.3525 15.5939 21.3902 14.7461C19.8796 14.2896 18.6406 13.2497 17.9549 11.8824C17.2693 10.515 17.1893 8.95102 17.6322 7.52001C16.3492 6.84201 14.8812 6.67301 13.5002 7.04001C12.0502 7.42301 10.8252 8.36201 10.0752 9.66601C8.9642 11.582 9.20719 14.084 10.3322 16C10.7252 16.653 11.2722 17.343 12.0002 17.343C12.7192 17.343 13.1172 16.661 14.0422 16.661C14.9652 16.661 15.3022 17.334 16.0962 17.334C16.8152 17.334 17.3572 16.671 17.7502 16.017C18.2012 15.258 18.5071 14.427 18.6552 13.559C17.5522 13.059 16.7532 11.993 16.5762 10.751C16.8442 10.651 17.1252 10.601 17.4062 10.601C18.4272 10.601 19.4022 11.062 20.0952 11.833C19.5392 13.706 19.9752 15.952 20.8002 17.1966Z"
                      fill="currentColor"
                    />
                  </svg>
                  Apple
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-xs text-muted-foreground">
                Already have an account?{' '}
                <Link to="/signin" className="text-primary underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
