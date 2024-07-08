// components/Hero.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import useProfileData from '../app/funct/useFetchProfileData';
export const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to store session status
  const profile = useProfileData();
  useEffect(() => {
    // Replace with your actual session check logic
    const checkSession = () => {
      // For example, use sessionStorage or call an API to verify session
      const sessionId = sessionStorage.getItem('id'); // Use 'id' instead of 'sessionId'
      setIsLoggedIn(!!sessionId); // Update state based on session existence
    };

    checkSession();
  }, []);
  return (
    <section className="flex items-center justify-center pt-64 pb-52">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 p-5">
          <h1 className="text-5xl font-bold mb-4">Menuju Kesehatan Optimal</h1>
          <p className="text-lg mb-8">
            Temukan Dunia Kesehatan yang Luas: <br />Mulai Perjalanan Kesehatan Anda dengan UPN Sehat!
          </p>
          {!isLoggedIn && (
            <div className="flex">
              <Link href='/login'>
                <Button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Login
                </Button>
              </Link>
              <Link href='/register'>
                <Button className="px-6 ms-4 py-3  bg-green-400 text-white rounded-lg hover:bg-green-600 transition">
                  Register
                </Button>
              </Link>
            </div>
          )}
          {isLoggedIn && profile && (
            <p className="text-lg mb-8">
              Hallo: {profile.nama}
            </p>
          )}
        </div>
        <div className="md:w-1/2">
          {/* Add your image or other content here */}
          <img src="https://plus.unsplash.com/premium_photo-1663054412718-10f332c90891?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero Image" className="w-full h-auto rounded-2xl shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
export default Hero;
