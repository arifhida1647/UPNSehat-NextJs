'use client'
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when request starts

        const response = await fetch("https://upn-sehat.vercel.app/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem("id", data.message);
            router.push("/");
        } else {
            console.error("Registration failed", data);
        }

        setIsLoading(false); // Set loading to false when request ends
    };

    return (
        <div className="flex items-center justify-center my-52">
            <Card className="w-[350px]">
                <form onSubmit={handleRegister}>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Name of your project"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email of your project"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password of your project"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between mt-5">
                        <Link href="/login" passHref>
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white" viewBox="0 0 24 24"></svg>
                            ) : "Register"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div >
    );
}
