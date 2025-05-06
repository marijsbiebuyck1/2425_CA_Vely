"use client";
import styles from './StationCard.module.css';
import StationImage from './StationImage';
import './StationImage.css';

import Link from "next/link";


export default function StationCard({ station, onLike, onDislike }) {
  return (
    <div className={styles.card}>
      <StationImage latitude={station.latitude} longitude={station.longitude} />
      <div className={styles.containerInfo}>
      <div className={styles.info}>
        {/* De inhoud van de kaart */}
        <h2>{station.name}</h2>
        <p>{station.distance.toFixed(2)} km van jou</p>
        <p>
          <img src="fiets.svg" alt="fiets" /> {station.free_bikes} |{' '}
          <img src="slotje.svg" alt="slot" />
          {station.empty_slots}
        </p>
      </div>
      {/* De naam van het station en de meer info knop komen onderaan */}
     
      <Link href={`/stations/${station.id}`}>
      <div className={styles.button}>
        <button className={styles.more}>
          <img src="pijl.svg" alt="pijl" />
          Meer
        </button>
      </div>
      </Link>
      </div>
    </div>
  );
}
