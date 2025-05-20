'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import './ToggleSwitch.modules.css';

const ToggleSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isStations = pathname === '/';

  const handleToggle = () => {
    if (isStations) {
      router.push('/likes');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="toggle-wrapper">
      <button
        className={`toggle-button ${isStations ? 'active' : ''}`}
        onClick={() => router.push('/')}
      >
        Stations
      </button>
      <button
        className={`toggle-button ${!isStations ? 'active' : ''}`}
        onClick={() => router.push('/likes')}
      >
        Matches
      </button>
    </div>
  );
};

export default ToggleSwitch;
