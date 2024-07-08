import { useState, useEffect } from "react";
import axios from "axios";
// src/types/profiles.ts
export interface Hours {
    id: string;
    time: string;
}

export interface Profile {
    id: string;
    Hours: Hours[];
    namaObat: string;
    email: string;
}

const useFetchCron = (email: string) => {
    const [Cron, setCron] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchCron() {
            try {
                const response = await axios.get(`https://upn-sehat.vercel.app/cekCron?email=${email}`);
                const CronData: Profile[] = response.data;
                setCron(CronData);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                console.error("Error fetching Cron:", error);
            }
        }

        fetchCron();
    }, [email]);

    return { Cron, isLoading, isError };
};

export default useFetchCron;
