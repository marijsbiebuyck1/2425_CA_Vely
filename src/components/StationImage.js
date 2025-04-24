

import { useEffect, useState } from 'react';

export default function StationImage({ station }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const bbox = `${station.longitude - 0.0001},${station.latitude - 0.0001},${station.longitude + 0.0001},${station.latitude + 0.0001}`;
      const response = await fetch(
        `https://graph.mapillary.com/images?access_token=${process.env.NEXT_PUBLIC_MAPILLARY_TOKEN}&fields=id,thumb_1024_url&bbox=${bbox}&limit=1`
      );
      const data = await response.json();
      if (data && data.data.length > 0) {
        setImage(data.data[0].thumb_1024_url); // Stel de afbeelding URL in
      }
    };
    fetchImage();
  }, [station]); // Zorg ervoor dat we opnieuw fetchen als het station verandert

  if (!image) {
    return <div className="noImage">No Image</div>; // Laat een fallback boodschap zien als er geen afbeelding is
  }

  return <img src={image} alt={station.name} className="stationImage" />;
}
