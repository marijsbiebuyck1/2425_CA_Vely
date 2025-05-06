'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hamburger-menu">
      <button onClick={() => setIsOpen(!isOpen)} className="hamburger-button">
        ☰
      </button>

      {isOpen && (
        <div className="menu-items">
          <Link href="/account" onClick={() => setIsOpen(false)}>Account</Link>
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/likes" onClick={() => setIsOpen(false)}>Likes</Link>
        </div>
      )}
    </div>
  );
}
