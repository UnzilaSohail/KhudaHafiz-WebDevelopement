'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: 'auto' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
     <div style={{  display: 'flex',margin: '10px auto', maxWidth: '300px', justifyContent:'center'  }}>
      <button onClick={loginUser}>Login</button>
      </div> 
     <div style={{  display: 'flex',margin: '5px auto', maxWidth: '300px', justifyContent:'center'  }}> <p><a href="/forgot-password">Forgot Password?</a></p></div>
      <center><p>Don't have an account? <a href="/signup">Sign up</a></p></center>
    </div>
  );
}
