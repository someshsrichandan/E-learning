
import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} LMS Admin Portal. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link to="/admin/users" className="text-sm text-muted-foreground hover:text-primary">
              Users
            </Link>
            <Link to="/admin/reports" className="text-sm text-muted-foreground hover:text-primary">
              Reports
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              Main Site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
