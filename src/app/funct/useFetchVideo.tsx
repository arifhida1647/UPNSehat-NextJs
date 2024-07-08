import { useState, useEffect } from "react";
import axios from "axios";
// src/types/profiles.ts

export interface Video {
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
        high: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      liveBroadcastContent: string;
      publishTime: string;
    };
  }
  
const useFetchVideo = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      async function fetchVideo() {
        try {
          const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search?part=snippet&q=kesehatan&type=video&maxResults=10&key=AIzaSyDyWeYGBhg0TGTb2kgvRPcI6aL4Uh_DhTk"
          );
          const videoData: Video[] = response.data.items;
          setVideos(videoData);
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          console.error("Error fetching videos:", error);
        }
      }
  
      fetchVideo();
    }, []);
  
    return { videos, isLoading, isError };
  };
  
  export default useFetchVideo;