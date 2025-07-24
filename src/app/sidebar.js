'use client';
import Link from 'next/link';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <aside style={{
      width: '200px',
      background: '#f5e9db',
      height: '100vh',
      padding: '1rem',
      position: 'sticky',
      top: 0
    }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/signup">Sign Up</Link></li>
        <li><Link href="/account">Change Password</Link></li>
        <li><Link href="/forgot-password">Forgot Password</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </aside>
  );
}
