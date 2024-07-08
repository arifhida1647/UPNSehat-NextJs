// pages/index.tsx
'use client'
import { useState } from "react";
import {
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Card, CardContent } from "@/components/ui/card";
import useFetchVideo from '../funct/useFetchVideo';
import { PaginationDemo } from "./components/paginationDemo"; // Import komponen PaginationDemo

export default function Home() {
    const { videos, isLoading, isError } = useFetchVideo();
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 8;

    if (isLoading) return <p className="container mx-auto px-4 py-8">Loading...</p>;
    if (isError) return <p className="container mx-auto px-4 py-8">Error fetching data.</p>;

    const totalPages = Math.ceil(videos.length / videosPerPage);
    const indexOfLasVideo = currentPage * videosPerPage;
    const indexOfFirsVideo = indexOfLasVideo - videosPerPage;
    const currentvideos = videos.slice(indexOfFirsVideo, indexOfLasVideo);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container min-h-screen">
            <div className="flex flex-col items-center justify-center my-60">
                <p className="text-4xl font-bold">Video</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                {currentvideos.map((videos, index) => (
                    <Card key={index} className="w-full mb-4">
                        <CardHeader>
                            <CardTitle className="text-base truncate overflow-hidden whitespace-nowrap">{videos.snippet.channelTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={videos.snippet.thumbnails.medium.url}
                                alt="Description of image"
                                className="rounded-xl"
                                width={500}
                                height={300}
                            />
                        </CardContent>
                        <CardFooter>
                            <p>{videos.snippet.publishTime}</p>
                        </CardFooter>
                    </Card>
                ))}

            </div>
            <div className="mb-24">
                <PaginationDemo currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
