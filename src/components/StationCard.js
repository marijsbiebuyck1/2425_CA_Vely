'use client';

import React from 'react';
import StationImage from './StationImage';
import styles from './StationCard.module.css';

export default function StationCard({ station, onLike, onDislike }) {
  return (
    <div className={styles.card}>
      <StationImage latitude={station.latitude} longitude={station.longitude} />
      <div className={styles.info}>
        <h2>{station.name}</h2>
        <p>{station.distance.toFixed(2)} km van jou</p>
        <p>
        <img src="fiets.svg" alt="fiets" /> {station.free_bikes} | <img src="slotje.svg" alt="slot" />{station.empty_slots}
        </p>
        <button className={styles.more}>Meer info</button>
      </div>
    </div>
  );
}
