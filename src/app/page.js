'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';
import { getDistance } from '@/helpers/get-distance';
import StationCard from '@/components/StationCard';
import StationControls from '@/components/StationControls';

export default function Home() {
  const [location, setLocation] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const { network, isLoading, isError } = useNetwork();

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!location.latitude || !location.longitude)
    return (
      <div className={styles.radarContainer}>
        <div className={styles.radar}></div>
        <p>Locatie ophalen...</p>
      </div>
    );

  // Bereken afstand tot elk station
  const stations = network.stations
    .map((station) => {
      station.distance =
        getDistance(
          location.latitude,
          location.longitude,
          station.latitude,
          station.longitude
        ).distance / 1000;
      return station;
    })
    .sort((a, b) => a.distance - b.distance);

  // Haal liked en disliked stations op uit localStorage
  const likedStations = JSON.parse(localStorage.getItem('likedStations')) || [];
  const dislikedStations = JSON.parse(localStorage.getItem('dislikedStations')) || [];

  // Filter stations die al geliked of disliked zijn eruit
  const filteredStations = stations.filter(
    (station) =>
      !dislikedStations.some((ds) => ds.id === station.id) &&
      !likedStations.some((ls) => ls.id === station.id)
  );

  const currentStation = filteredStations[currentIndex];

  const handleLike = () => {
    if (currentIndex < filteredStations.length) {
      const station = filteredStations[currentIndex];
      const likedStations = JSON.parse(localStorage.getItem('likedStations')) || [];

      if (!likedStations.find((s) => s.id === station.id)) {
        likedStations.push(station);
        localStorage.setItem('likedStations', JSON.stringify(likedStations));
      }

      setFeedback('like');
      setTimeout(() => {
        setFeedback(null);
        setCurrentIndex((prev) => prev + 1);
      }, 800);
    }
  };

  const handleDislike = () => {
    if (currentIndex < filteredStations.length) {
      const station = filteredStations[currentIndex];
      const dislikedStations = JSON.parse(localStorage.getItem('dislikedStations')) || [];

      if (!dislikedStations.find((s) => s.id === station.id)) {
        dislikedStations.push(station);
        localStorage.setItem('dislikedStations', JSON.stringify(dislikedStations));
      }

      setFeedback('dislike');
      setTimeout(() => {
        setFeedback(null);
        setCurrentIndex((prev) => prev + 1);
      }, 800);
    }
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
