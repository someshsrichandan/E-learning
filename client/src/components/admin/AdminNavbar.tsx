
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Menu, X, BarChart, Users, BookOpen, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const AdminNavbar = () => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const links = [
    { href: "/admin", label: "Dashboard", icon: <BarChart className="h-4 w-4 mr-2" /> },
    { href: "/admin/users", label: "Users", icon: <Users className="h-4 w-4 mr-2" /> },
    { href: "/admin/reports", label: "Reports", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { href: "/", label: "Back to Site", icon: null }
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/admin" className="font-bold text-xl flex items-center">
            <span className="text-primary">Admin</span>Portal
          </Link>
        </div>
        
        {isMobile ? (
          <>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4">
                  {links.map((link, i) => (
                    <Link
                      key={i}
                      to={link.href}
                      className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                  <Button variant="ghost" className="justify-start px-2" onClick={() => setOpen(false)}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <nav className="flex items-center gap-6 text-sm">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="flex items-center font-medium transition-colors hover:text-primary"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>System Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
