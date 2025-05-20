'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';
import { useParams } from 'next/navigation';
import StationImage from '@/components/StationImage';
import { useEffect, useState } from 'react';

import Link from 'next/link';

// Hulpfunctie om de afstand tussen twee punten te berekenen (in km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Straal van de aarde in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Afstand in km
};

export default function Station() {
  const { network, isLoading, isError } = useNetwork();
  const params = useParams();

  // State voor huidige locatie en afstand
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Verkrijg de huidige locatie van de gebruiker
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Fout bij het verkrijgen van locatie:', error);
        }
      );
    }
  }, []); // Dit effect draait eenmaal bij de initiële rendering

  useEffect(() => {
    // Bereken de afstand zodra de locatie van de gebruiker en het station beschikbaar zijn
    if (userLocation && network) {
      const station = network.stations.find(
        (station) => station.id === params.stationId
      );
      if (station) {
        const stationLat = station.latitude;
        const stationLon = station.longitude;
        const dist = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          stationLat,
          stationLon
        );
        setDistance(dist);
      }
    }
  }, [userLocation, network, params.stationId]); // Dit effect draait wanneer de locatie of netwerk verandert

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const station = network.stations.find(
    (station) => station.id === params.stationId
  );

  return (
    <div className={styles.card}>
      <div className={styles.containerInfo}>
        <div className={styles.info}>
          <h2 className="stationName">{station.name}</h2>
          {distance ? (
            <p>{distance.toFixed(2)} km van jou</p>
          ) : (
            <p>Afstand niet beschikbaar</p>
          )}
          <p>
            <img src="/fiets.svg" alt="fiets" /> {station.free_bikes} |{' '}
            <img src="/slotje.svg" alt="slot" />
            {station.empty_slots}
          </p>

          <div className={styles.buttonGroup}>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.noLinkStyle}
            >
              <button className={styles.actionButton}>
                <img src="/route.svg" alt="route" className={styles.icon} />
                <span>Route station</span>
              </button>
            </a>
            <button className={styles.actionButton}>
              <img src="/fietsje.svg" alt="fiets" className={styles.icon} />
              <span>Neem een fiets</span>
            </button>
          </div>

          <StationImage
            latitude={station.latitude}
            longitude={station.longitude}
            className="smallImage"
          />
        </div>
      </div>

      <Link href={`/`}>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <button className={styles.more}>
              <img src="/terug.svg" alt="pijl" className={styles.arrow} />
              <span className={styles.backText}>Terug</span>{' '}
              {/* Terug onder de pijl */}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
