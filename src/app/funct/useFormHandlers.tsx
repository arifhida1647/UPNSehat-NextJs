import { useEffect, useState } from "react";
import axios from 'axios';
import useProfileData from '@/app/funct/useFetchProfileData';

export interface FormData {
  namaObat: string;
  hoursTime: string;
  minutesTime: string;
  email: string;
}

export const useFormHandlers = () => {
  const [loadingProfile, setLoadingProfile] = useState(true); // State untuk menandai status pemuatan profil
  const [formData, setFormData] = useState<FormData>({
    namaObat: "",
    hoursTime: "",
    minutesTime: "",
    email: "", // Nilai awal kosong
  });

  const profile = useProfileData();

  useEffect(() => {
    if (profile) {
      setFormData(prevState => ({
        ...prevState,
        email: profile.email || '', // Set email setelah data profil tersedia
      }));
      setLoadingProfile(false); // Tandai bahwa proses pemuatan profil selesai
    }
  }, [profile]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      namaObat: e.target.value,
    }));
  };

  const handleJamChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      hoursTime: value,
    }));
  };

  const handleMenitChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      minutesTime: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://upn-sehat.vercel.app/create-job", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Data submitted successfully!");
        console.log(data); // for debugging purposes
        window.location.reload(); 
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert(`Request failed`);
    }
  };
  
  const handleDelete = (namaObat: string, email: string) => {
    const url = `https://upn-sehat.vercel.app/delete-job?namaObat=${encodeURIComponent(namaObat)}&email=${encodeURIComponent(email)}`;
    axios.get(url)
      .then(response => {
        console.log('Delete successful:', response.data);
        alert("Data deleted successfully!");
        window.location.reload(); 
      })
      .catch(error => {
        console.error('There was an error deleting the profile:', error);
        alert(`Error deleting data: ${error.message}`);
      });
  };

  return {
    formData,
    handleNameChange,
    handleJamChange,
    handleMenitChange,
    handleSubmit,
    handleDelete
  };
};
