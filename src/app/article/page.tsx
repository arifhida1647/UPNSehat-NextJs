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
import useFetchArticle from '../../app/funct/useFetchArticle';
import { PaginationDemo } from "./components/paginationDemo"; // Import komponen PaginationDemo

export default function Home() {
    const { articles, isLoading, isError } = useFetchArticle();
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8;

    if (isLoading) return <p className="container mx-auto px-4 py-8">Loading...</p>;
    if (isError) return <p className="container mx-auto px-4 py-8">Error fetching data.</p>;

    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container min-h-screen">
            <div className="flex flex-col items-center justify-center my-60">
                <p className="text-4xl font-bold">Article</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                {currentArticles.map((article, index) => (
                    <Card key={index} className="w-full mb-4">
                        <CardHeader>
                            <CardTitle className="text-base truncate overflow-hidden whitespace-nowrap">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={article.urlToImage}
                                alt="Description of image"
                                className="rounded-xl"
                                width={500}
                                height={300}
                            />
                        </CardContent>
                        <CardFooter>
                            <p>{article.author}</p>
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
