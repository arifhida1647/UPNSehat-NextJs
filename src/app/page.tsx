
// pages/index.tsx
'use client';
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Jadwal from '../components/Jadwal';
import Video from '../components/Video';
import Article from '../components/Article';
export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (id) {
      setSessionId(id);
    }
  }, []);
  return (
    <main className="">
      <Hero/>
      {sessionId && (
          <Jadwal/>
      )}
      <Video />
      <Article />
    </main>
  );
}
