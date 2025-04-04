
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">About EduFlow</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              We're on a mission to transform online education by providing a platform that connects passionate instructors with eager learners from around the world.
            </p>
            
            <div className="mb-12 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Our team"
                className="w-full h-auto"
              />
            </div>
            
            <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
            <p className="mb-6">
              Founded in 2023, EduFlow began with a simple idea: education should be accessible, engaging, and effective for everyone. Our founders, experienced educators and technology experts, wanted to create a platform that addresses the common challenges faced in online learning environments.
            </p>
            <p className="mb-8">
              What started as a small project has now grown into a comprehensive learning management system trusted by thousands of instructors and students worldwide. We continue to innovate and improve our platform based on feedback from our community.
            </p>
            
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="mb-8">
              We believe in the power of education to transform lives and communities. Our mission is to break down barriers to quality education by providing an intuitive platform where knowledge can be shared easily and effectively. We aim to empower both educators and learners with the tools they need to succeed in today's rapidly changing world.
            </p>
            
            <h2 className="mb-4 text-2xl font-bold">Our Values</h2>
            <div className="mb-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  We believe quality education should be available to everyone, regardless of location or background.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We continuously evolve our platform to incorporate the latest educational technologies and best practices.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground">
                  We foster a supportive environment where instructors and learners can connect and collaborate.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  We strive for the highest quality in our platform, content, and support.
                </p>
              </div>
            </div>
            
            <h2 className="mb-4 text-2xl font-bold">Meet Our Team</h2>
            <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 mx-auto overflow-hidden rounded-full w-32 h-32">
                  <img
                    src="https://i.pravatar.cc/128?img=12"
                    alt="CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">CEO & Co-founder</p>
              </div>
              <div className="text-center">
                <div className="mb-3 mx-auto overflow-hidden rounded-full w-32 h-32">
                  <img
                    src="https://i.pravatar.cc/128?img=11"
                    alt="CTO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Michael Lee</h3>
                <p className="text-sm text-muted-foreground">CTO & Co-founder</p>
              </div>
              <div className="text-center">
                <div className="mb-3 mx-auto overflow-hidden rounded-full w-32 h-32">
                  <img
                    src="https://i.pravatar.cc/128?img=10"
                    alt="Head of Education"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Elena Rodriguez</h3>
                <p className="text-sm text-muted-foreground">Head of Education</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
