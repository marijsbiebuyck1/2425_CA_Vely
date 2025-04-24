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
        <p>🚲 {station.free_bikes} | 🅿️ {station.empty_slots}</p>
        <button className={styles.more}>Meer info</button>
      </div>
      <div className={styles.actions}>
        <button onClick={onDislike} className={styles.dislike}>❌</button>
        <button onClick={onLike} className={styles.like}>❤️</button>
      </div>
    </div>
  );
}
