import { useState, useEffect } from "react";
import axios from "axios";
// src/types/profiles.ts

export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }
  
const useFetchArticle = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      async function fetchArticle() {
        try {
          const response = await axios.get(
            "https://upn-sehat.vercel.app/api/news"
          );
          const ArticleData: Article[] = response.data.articles;
          setArticles(ArticleData);
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          console.error("Error fetching Articles:", error);
        }
      }
  
      fetchArticle();
    }, []);
  
    return { articles, isLoading, isError };
  };
  
  export default useFetchArticle;