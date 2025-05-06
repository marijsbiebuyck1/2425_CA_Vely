'use client';

import { useState, useEffect } from 'react';
import StationCard from '@/components/LikedCard';


export default function LikesPage() {
  const [likedStations, setLikedStations] = useState([]);

  useEffect(() => {
    const storedLikedStations = JSON.parse(localStorage.getItem('likedStations')) || [];
    setLikedStations(storedLikedStations);
  }, []);

  useEffect(() => {
    // Zet body overflow op auto zodat je kan scrollen op likes pagina
    document.body.classList.remove('no-scroll');
    document.body.style.overflow = 'auto';

    return () => {
      // Wanneer je weg gaat van LikesPage → herstel naar geen scroll
      document.body.classList.add('no-scroll');
      document.body.style.overflow = 'hidden';
    };
  }, []);

  return (
    <main>
      <div className="contentWrapper">
        <h1>Mijn matches</h1></div>
      {likedStations.length > 0 ? (
        likedStations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))
      ) : (
        <p>Je hebt nog geen stations geliket.</p>
      )}
    </main>
  );
}
