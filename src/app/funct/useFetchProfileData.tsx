// hooks/useProfileData.ts
import { useState, useEffect } from 'react';

interface ProfileData {
  nama: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  // Add more fields as needed
}

const useProfileData = (): ProfileData | null => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (typeof window !== 'undefined') { // Check if running in the browser
        const sessionId = sessionStorage.getItem('id');
        if (sessionId) {
          try {
            const response = await fetch(`https://upn-sehat.vercel.app/cek-profile?uid=${sessionId}`);
            if (response.ok) {
              const data = await response.json();
              setProfile(data);
            } else {
              console.error('Failed to fetch profile data');
              // Handle error case if needed
            }
          } catch (error) {
            console.error('Error fetching profile data:', error);
            // Handle fetch error
          }
        }
      }
    };

    fetchProfile();
  }, []); // Empty dependency array to run once on component mount

  return profile;
};

export default useProfileData;
