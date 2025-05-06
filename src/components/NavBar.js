// components/NavBar.js

import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link href="/account" className="nav-item">
        <div className="icon-label">
          <Image src="/account.svg" alt="Account" width={30} height={30} />
          <span>Account</span>
        </div>
      </Link>
      <Link href="/" className="nav-item">
        <div className="icon-label">
          <Image src="/huisje.svg" alt="Home" width={30} height={30} />
          <span>Home</span>
        </div>
      </Link>
      <Link href="/likes" className="nav-item">
        <div className="icon-label">
          <Image src="/heart.svg" alt="Likes" width={30} height={30} />
          <span>Likes</span>
        </div>
      </Link>
    </nav>
  );
}
