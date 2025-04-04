
import React, { useState } from 'react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminFooter from '@/components/admin/AdminFooter';
import UserTable from '@/components/admin/UserTable';
import { Button } from '@/components/ui/button';
import CreateUserDialog from '@/components/admin/CreateUserDialog';
import { useFakeUsers } from '@/hooks/use-fake-users';
import { Plus } from 'lucide-react';

export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastActive?: string;
}

const ManageUsers = () => {
  const { users, isLoading, addUser, updateUser, deleteUser } = useFakeUsers();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleCreate = (user: Omit<User, 'id' | 'createdAt'>) => {
    addUser({
      ...user,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    });
    setDialogOpen(false);
  };

  const handleUpdate = (user: User) => {
    updateUser(user);
    setUserToEdit(null);
    setDialogOpen(false);
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setUserToEdit(user);
    } else {
      setUserToEdit(null);
    }
    setDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <UserTable 
          users={users} 
          isLoading={isLoading} 
          onEdit={handleOpenDialog}
          onDelete={deleteUser}
        />
        
        <CreateUserDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen}
          user={userToEdit}
          onSubmit={userToEdit ? handleUpdate : handleCreate}
        />
      </main>
      <AdminFooter />
    </div>
  );
};

export default ManageUsers;
