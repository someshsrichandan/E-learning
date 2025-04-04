
import React, { useState } from 'react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminFooter from '@/components/admin/AdminFooter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceReport from '@/components/admin/PerformanceReport';
import StudentProgress from '@/components/admin/StudentProgress';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Report exported successfully",
      description: "The report has been downloaded to your device",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Reports</h1>
          <Button onClick={handleExportReport} className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="progress">Student Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="mt-0">
            <PerformanceReport />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-0">
            <StudentProgress />
          </TabsContent>
        </Tabs>
      </main>
      <AdminFooter />
    </div>
  );
};

export default Reports;
