'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/authContext';
import Modal from './Modal';
import { auth } from './firebase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const user = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const handleChangePasswordRedirect = () => {
    setOpen(false); // Close the modal
    router.push('/change-password'); // Navigate to page
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <img src="/logo.jpg" alt="Khuda Hafiz Logo" width="40" height="40" />
        <span className="navbar-title" >Khuda Hafiz</span>
      </div>

      <div className="nav-right">
        {!user && (
          <>
            <Link href="/login" className="navbar-button">Login</Link>
            <Link href="/signup" className="navbar-button">Sign Up</Link>
          </>
        )}
        {user && (
          <button className="icon-btn" onClick={() => setOpen(true)}>Settings</button>
        )}
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3>Your Account</h3>
          <button onClick={handleChangePasswordRedirect}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </Modal>
      )}
    </header>
  );
}
