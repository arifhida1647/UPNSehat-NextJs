'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/toggletheme";
import { Menu } from "lucide-react";
import { BiHealth } from "react-icons/bi";
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation

export const Navbar = () => {
    const router = useRouter(); // Initialize useRouter
    const pathname = usePathname(); // Get current pathname using usePathname
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to store session status

    const getButtonClass = (path: string) => {
        return pathname === path ? 'bg-green-500 text-white' : 'text-white'; // Apply bg-green-500 when active
    }

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            if (window.scrollY === 0) {
                setIsVisible(true);
            }

            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    // Check session status on component mount
    useEffect(() => {
        // Replace with your actual session check logic
        const checkSession = () => {
            // For example, use sessionStorage or call an API to verify session
            const sessionId = sessionStorage.getItem('id'); // Use 'id' instead of 'sessionId'
            setIsLoggedIn(!!sessionId); // Update state based on session existence
        };

        checkSession();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('id'); // Remove the session id
        setIsLoggedIn(false); // Update state to logged out
        window.location.reload();// Redirect to home page
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-5 shadow-xl transition-transform duration-300 ${isVisible ? 'translate-y-0 bg-slate-800' : '-translate-y-full'}`}
        >
            <div className="container mx-auto flex justify-between items-center text-white">
                <Link href="/" passHref className="flex items-center">
                    <BiHealth className="text-3xl text-green-400 mr-2" />UPN Sehat
                </Link>

                <div className="hidden md:flex items-center space-x-4">
                    <div className="">
                        <Link href="/" passHref>
                            <Button variant="ghost" className={getButtonClass('/')}>Home</Button>
                        </Link>
                        <Link href="/about" passHref>
                            <Button variant="ghost" className={getButtonClass('/about')}>About</Button>
                        </Link>
                        <Link href="/article" passHref>
                            <Button variant="ghost" className={getButtonClass('/article')}>Article</Button>
                        </Link>
                        <Link href="/video" passHref>
                            <Button variant="ghost" className={getButtonClass('/video')}>Video</Button>
                        </Link>
                        {isLoggedIn && (
                        <Link href="/profiles" passHref>
                            <Button variant="ghost" className={getButtonClass('/profiles')}>Profiles</Button>
                        </Link>
                        )}
                        {isLoggedIn && (
                            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                        )}
                    </div>
                    <ModeToggle />
                </div>
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push('/')}>
                                Home
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/about')}>
                                About
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/contact')}>
                                Contact
                            </DropdownMenuItem>
                            {isLoggedIn && (
                                <DropdownMenuItem onClick={() => router.push('/profiles')}>
                                    Profile
                                </DropdownMenuItem>
                            )}
                            {isLoggedIn && (
                                <DropdownMenuItem onClick={handleLogout}>
                                    Logout
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                                <ModeToggle />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
