"use client";
import styles from './StationCard.module.css';
import StationImage from './StationImage';
import './StationImage.css';
import Link from "next/link";

export default function StationCard({ station, feedback }) {
  return (
    <div className={styles.card}>
      <StationImage latitude={station.latitude} longitude={station.longitude} />
      
      {/* Feedback-overlay */}
      {feedback && (
        <div className={styles.feedbackOverlay}>
          <img
            src={feedback === 'like' ? '/like.svg' : '/dislike.svg'}
            alt={feedback}
            className={styles.feedbackImg}
          />
        </div>
      )}

      <div className={styles.containerInfo}>
        <div className={styles.info}>
          <h2>{station.name}</h2>
          <p>{station.distance.toFixed(2)} km van jou</p>
          <p>
            <img src="fiets.svg" alt="fiets" /> {station.free_bikes} |{' '}
            <img src="slotje.svg" alt="slot" /> {station.empty_slots}
          </p>
        </div>

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
