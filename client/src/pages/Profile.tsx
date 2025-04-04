import React from "react";
import { ChevronRight, Download, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Footer } from "react-day-picker";
import { useNavigate } from "react-router-dom";
const Profile: React.FC = () => {
  const navigate = useNavigate();
  const studentData = {
    name: "Taniya Sharma",
    course: "B.tech / CSE",
    date: "14 Feb 2025",
    time: "11:55AM",
    referID: "AB-2021",
    regNo: "2101298126",
    fees: {
      total: "₹1,20,000",
      paid: "₹90,000",
      remaining: "₹30,000",
    },
  };

  const documentLinks = [
    { name: "10th Mark Sheet", icon: ChevronRight },
    { name: "12th Mark Sheet", icon: ChevronRight },
    { name: "Adhaar Card", icon: ChevronRight },
    { name: "Pan Card", icon: ChevronRight },
    { name: "Passport Size Photo", icon: ChevronRight },
    { name: "JEE Rank Card", icon: ChevronRight },
  ];

  const accordionSections = [
    { title: "Personal Information", icon: ChevronDown },
    { title: "Academic Information", icon: ChevronDown },
    { title: "Skills", icon: ChevronDown },
    { title: "Attendance", icon: ChevronDown },
    { title: "Fee Details", icon: ChevronDown },
  ];

  return (
    <div >

              <Navbar/>


      <div className="p-5 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Student Profile Card */}
          <div className="col-span-1 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-4 flex flex-col items-center">
            <div className="text-center mb-2">
              <p className="text-gray-600 text-sm">Good Morning, Taniya</p>
              <p className="font-semibold">{studentData.time}, {studentData.date}</p>
            </div>
            
            <div className="relative mb-2">
              <div className="w-24 h-24 rounded-full border-4 border-blue-300 overflow-hidden">
                <img 
                  src="/lovable-uploads/bfcdc4de-4cba-4d73-bc01-cd92bbc2d070.png" 
                  alt="Student" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h3 className="text-orange-500 font-bold text-lg">{studentData.name}</h3>
            <p className="text-gray-700 text-sm">{studentData.course}</p>
            
            <div className="w-full mt-2 space-y-1 text-sm">
              <p className="text-gray-600">Refer ID: {studentData.referID}</p>
              <p className="text-gray-600">Reg No: {studentData.regNo}</p>
            </div>
            
            <Button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-white rounded-md flex items-center justify-center gap-1" onClick={()=>navigate("/edit-profile")}>
             
              Edit Profile
            </Button>
          </div>

          {/* Fee Information and Accordion */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            {/* Fee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-800">{studentData.fees.total}</p>
                <p className="text-sm text-green-800">Total Fees till Date</p>
              </div>
              
              <div className="bg-pink-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-pink-800">{studentData.fees.paid}</p>
                <p className="text-sm text-pink-800">Total Paid by You Till Date</p>
              </div>
              
              <div className="bg-yellow-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-yellow-800">{studentData.fees.remaining}</p>
                <p className="text-sm text-yellow-800">Remaining Dues</p>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-2">
              {accordionSections.map((section, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4">
                  <button className="w-full flex items-center justify-between text-left">
                    <span className="font-medium text-blue-900">{section.title}</span>
                    <ChevronDown size={20} className="text-blue-900" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Document Links */}
          <div className="col-span-1 md:col-span-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {documentLinks.map((doc, index) => (
                <div 
                  key={index} 
                  className="bg-blue-100 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-blue-200 transition-colors"
                >
                  <span className="font-medium text-blue-800">{doc.name}</span>
                  <ChevronRight size={20} className="text-blue-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Profile;

