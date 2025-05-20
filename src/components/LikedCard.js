import styles from './LikedCard.module.css';
import Link from 'next/link';

export default function StationCard({ station }) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.containerInfo}>
          <div className={styles.info}>
            <h2>{station.name}</h2>
            <p>{station.distance.toFixed(2)} km van jou</p>
            <p>
              <img src="fiets.svg" alt="fiets" /> {station.free_bikes} |{' '}
              <img src="slotje.svg" alt="slot" />
              {station.empty_slots}
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
    </div>
  );
}
