'use client';

import { useState, useEffect } from 'react';
import StationCard from '@/components/StationCard';

export default function LikesPage() {
  const [likedStations, setLikedStations] = useState([]);

  useEffect(() => {
    const storedLikedStations = JSON.parse(localStorage.getItem('likedStations')) || [];
    setLikedStations(storedLikedStations);
  }, []);

  return (
    <main>
      <h1>Mijn matches</h1>
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
