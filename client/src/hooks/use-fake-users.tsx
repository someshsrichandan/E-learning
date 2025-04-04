
import { useState, useEffect } from 'react';
import { User } from '@/pages/admin/ManageUsers';
import { useToast } from '@/hooks/use-toast';

// Sample initial user data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'admin',
    createdAt: '2023-01-15T10:30:00Z',
    lastActive: '2023-04-01T08:45:00Z',
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    role: 'faculty',
    createdAt: '2023-02-20T14:20:00Z',
    lastActive: '2023-03-30T16:15:00Z',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'faculty',
    createdAt: '2023-02-25T09:10:00Z',
    lastActive: '2023-04-02T11:30:00Z',
  },
  {
    id: '4',
    name: 'Sophia Davis',
    email: 'sophia.davis@example.com',
    role: 'student',
    createdAt: '2023-03-05T16:45:00Z',
    lastActive: '2023-03-28T10:20:00Z',
  },
  {
    id: '5',
    name: 'William Wilson',
    email: 'william.wilson@example.com',
    role: 'student',
    createdAt: '2023-03-12T08:30:00Z',
    lastActive: '2023-04-01T15:40:00Z',
  },
  {
    id: '6',
    name: 'Olivia Miller',
    email: 'olivia.miller@example.com',
    role: 'student',
    createdAt: '2023-03-18T11:15:00Z',
    lastActive: '2023-03-31T09:05:00Z',
  },
];

export function useFakeUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setUsers(initialUsers);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addUser = (user: Omit<User, 'id' | 'createdAt'> & { id: string, createdAt: string }) => {
    setUsers((prev) => [...prev, user]);
    toast({
      title: "User created",
      description: `${user.name} has been added successfully`,
    });
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prev) => 
      prev.map((user) => user.id === updatedUser.id ? updatedUser : user)
    );
    toast({
      title: "User updated",
      description: `${updatedUser.name}'s information has been updated`,
    });
  };

  const deleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    toast({
      title: "User deleted",
      description: userToDelete ? `${userToDelete.name} has been removed` : "User has been removed",
    });
  };

  return {
    users,
    isLoading,
    addUser,
    updateUser,
    deleteUser,
  };
}
