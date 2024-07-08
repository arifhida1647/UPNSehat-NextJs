import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import useFetchArticle from '../app/funct/useFetchArticle';
export const Article = () => {
    const { articles, isLoading, isError } = useFetchArticle();
    if (isLoading) return <p className="container mx-auto px-4 py-8">Loading...</p>;
    if (isError) return <p className="container mx-auto px-4 py-8">Error fetching data.</p>;
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-8">Video Rekam Medis</h1>
                <Link href="#" passHref className="text-sm font-bold mb-8 text-blue-500">Video More</Link>
            </div>
            <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                    {articles.map((articles) => (
                        <CarouselItem key={articles.source.id} className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base truncate overflow-hidden whitespace-nowrap">{articles.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={articles.urlToImage}
                                        alt="Description of image"
                                        className="rounded-xl"
                                        width={500}
                                        height={300}
                                    />
                                </CardContent>
                                <CardFooter>
                                    <p>{articles.author}</p>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default Article;
