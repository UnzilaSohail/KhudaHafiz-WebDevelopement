'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', backgroundColor: '#fdf6f0', height: '100vh', paddingTop: '50px' }}>
      <h1 style={{ color: '#5c4033' }}>Welcome to the Funeral Service Portal</h1>
      <p style={{ color: '#7b5e57' }}>Please sign up or log in to continue</p>

      <div style={{ marginTop: '40px' }}>
        <Link href="/signup">
          <button style={buttonStyle}>Sign Up</button>
        </Link>
        <br /><br />
        <Link href="/login">
          <button style={buttonStyle}>Login</button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#8B4513',
  color: '#fff',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer',
  width: '150px',
};
