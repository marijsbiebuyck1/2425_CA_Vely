'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function StationImage({ latitude, longitude }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(
        `https://graph.mapillary.com/images?access_token=${process.env.NEXT_PUBLIC_MAPILLARY_TOKEN}&fields=id,thumb_1024_url&bbox=${longitude - 0.0001},${latitude - 0.0001},${longitude + 0.0001},${latitude + 0.0001}&limit=1`
      );
      const data = await response.json();
      console.log(data); // 👉 check hier wat je terugkrijgt
      const url = data?.data?.[0]?.thumb_1024_url;
      setImageUrl(url);
    }

    fetchImage();
  }, [latitude, longitude]);

  if (!imageUrl) return <div>Loading image...</div>;

  return (
    <Image
      src={imageUrl}
      alt="Mapillary station"
      width={300}
      height={200}
      className="rounded-lg"
    />
  );
}

