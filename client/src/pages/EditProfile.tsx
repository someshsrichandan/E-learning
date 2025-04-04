import React, { useState } from "react";
import { Check } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface ProfileFormData {
  name: string;
  age: string;
  phone: string;
  email: string;
  image: string;
  address: string;
  college: string;
  about: string;

  // name:string,
  // age:string,
  //phone:string,
  //phone:string,
  // image:string,
  //email:string,
  // college:string,
  //about:string
}

const EditProfile: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "Mehrab",
    age: "12",
    phone: "7978290952",
    email: "Mehrabbozorgi.business@gmail.com",
    image: "58077.79",
    address: "Mehrab",
    college: "Bozorgi",
    about: "sbdfbnd65sfdvb s",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    // Reset form or navigate back
    console.log("Cancelled");
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="container mx-auto my-5 px-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Edit profile</h1>
          <div className="relative">
            <img
              src="/lovable-uploads/6cf1926f-a15d-42b4-8883-264deac44308.png"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium">
                  Age
                </label>
                <Input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                phone
              </label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  type="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md pr-10"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                email
              </label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image Upload
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  address
                </label>
                  <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
              </div>

              <div className="space-y-2">
                <label htmlFor="college" className="text-sm font-medium">
                  college
                </label>
                <div className="relative">
                  <select
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={(e) =>
                      handleSelectChange("college", e.target.value)
                    }
                    className="w-full h-10 px-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Bozorgi">Bozorgi</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="about" className="text-sm font-medium">
                about
              </label>
              <div className="relative">
                <Input
                  id="about"
                  name="about"
                  type="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md pr-10"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-24 border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="w-24 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
