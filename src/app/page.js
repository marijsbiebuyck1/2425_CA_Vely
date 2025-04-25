'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';
import { getDistance } from '@/helpers/get-distance';
import StationCard from '@/components/StationCard';
import StationImage from '@/components/StationImage';
import StationControls from '@/components/StationControls';

export default function Home() {
  const [location, setLocation] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
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
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  if (!location.latitude || !location.longitude)
    return <div>Locatie ophalen...</div>;

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

  const handleLike = () => {
    if (currentIndex < stations.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleDislike = () => {
    if (currentIndex < stations.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentStation = stations[currentIndex];

  return (
    <main className={styles.main}>
      {currentStation ? (
        <>
          <StationCard
            station={currentStation}
          />
          <StationControls onLike={handleLike} onDislike={handleDislike} />
        </>
        
      ) : (
        <p>Geen stations meer in de buurt.</p>
      )}
    </main>
  );
}
