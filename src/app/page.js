'use client';

import styles from './page.module.css';
import { useState, useEffect, useMemo } from 'react';
import useNetwork from '@/data/network';
import { getDistance } from '@/helpers/get-distance';
import StationCard from '@/components/StationCard';
import StationControls from '@/components/StationControls';

export default function Home() {
  const [location, setLocation] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [likedStations, setLikedStations] = useState([]);
  const [dislikedStations, setDislikedStations] = useState([]);

  const { network, isLoading, isError } = useNetwork();

  // Haal locatie op
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error(error)
      );
    } else {
      console.error('Geolocatie wordt niet ondersteund.');
    }
  }, []);

  // Haal liked en disliked stations uit localStorage bij laden
  useEffect(() => {
    const storedLiked = localStorage.getItem('likedStations');
    if (storedLiked) setLikedStations(JSON.parse(storedLiked));

    const storedDisliked = localStorage.getItem('dislikedStations');
    if (storedDisliked) setDislikedStations(JSON.parse(storedDisliked));
  }, []);

  // Bereken filteredStations op basis van dislikedStations en network.stations
  const filteredStations = useMemo(() => {
    if (!network?.stations || !location.latitude || !location.longitude) return [];
  
    return network.stations
      .map((station) => {
        const distance = getDistance(
          location.latitude,
          location.longitude,
          station.latitude,
          station.longitude
        ).distance / 1000;
        return { ...station, distance };
      })
      .filter((station) => 
        !dislikedStations.some(ds => ds.id === station.id) &&
        !likedStations.some(ls => ls.id === station.id)
      )
      .sort((a, b) => a.distance - b.distance);
  }, [network, location, dislikedStations, likedStations]);
  

  // Houd currentIndex binnen de grenzen van filteredStations
  useEffect(() => {
    if (currentIndex >= filteredStations.length) {
      setCurrentIndex(0);
    }
  }, [filteredStations, currentIndex]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!location.latitude || !location.longitude) 
    return (
      <div className={styles.radarContainer}>
        <div className={styles.radar}></div>
        <p>Locatie ophalen...</p>
      </div>
    );

  const currentStation = filteredStations[currentIndex];

  const handleLike = () => {
    if (!currentStation) return;
  
    if (!likedStations.find(s => s.id === currentStation.id)) {
      const updatedLiked = [...likedStations, currentStation];
      localStorage.setItem('likedStations', JSON.stringify(updatedLiked));
      setLikedStations(updatedLiked);
  
      // Pas index aan direct nadat likedStations update
      const newFilteredLength = filteredStations.length - 1;
      setCurrentIndex(prev => (prev >= newFilteredLength ? 0 : prev));
    }
  
    setFeedback('like');
    setTimeout(() => {
      setFeedback(null);
    }, 800);
  };
  
  const handleDislike = () => {
    if (!currentStation) return;
  
    if (!dislikedStations.find(s => s.id === currentStation.id)) {
      const updatedDisliked = [...dislikedStations, currentStation];
      localStorage.setItem('dislikedStations', JSON.stringify(updatedDisliked));
      setDislikedStations(updatedDisliked);
  
      // Pas index aan direct nadat dislikedStations update
      const newFilteredLength = filteredStations.length - 1;
      setCurrentIndex(prev => (prev >= newFilteredLength ? 0 : prev));
    }
  
    setFeedback('dislike');
    setTimeout(() => {
      setFeedback(null);
    }, 800);
  };
  

  return (
    <main className={styles.main}>
      {currentStation ? (
        <>
          <StationCard station={currentStation} feedback={feedback} />
          <StationControls onLike={handleLike} onDislike={handleDislike} />
        </>
      ) : (
        <p>Geen stations meer in de buurt.</p>
      )}
    </main>
  );
}
