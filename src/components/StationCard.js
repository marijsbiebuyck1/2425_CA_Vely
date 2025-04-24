import { useState, useEffect } from 'react';
import styles from './StationCard.module.css';

export default function StationCard({ station, onLike, onDislike }) {
  const { name, distance, free_bikes, empty_slots, longitude, latitude } = station;
  
  // Haal de afbeelding op via de API
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(`https://graph.mapillary.com/images?access_token=${process.env.NEXT_PUBLIC_MAPILLARY_TOKEN}&fields=id,thumb_1024_url&bbox=${longitude - 0.0001},${latitude - 0.0001},${longitude + 0.0001},${latitude + 0.0001}&limit=1`);
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setImageUrl(data.data[0].thumb_1024_url);  // Get the image URL
      }
    };
    fetchImage();
  }, [longitude, latitude]);

  return (
    <div className={styles.card}>
      <img src={imageUrl || '/placeholder-image.jpg'} alt={`Image of ${name}`} className={styles.stationImage} />
      <div className={styles.info}>
        <h2>{name}</h2>
        <p>{Math.round(distance)} meters away</p>
        <p>Free bikes: {free_bikes} | Empty slots: {empty_slots}</p>
        <div className={styles.buttons}>
          <button onClick={onDislike} className={styles.dislike}>👎</button>
          <button onClick={onLike} className={styles.like}>👍</button>
        </div>
      </div>
    </div>
  );
}
