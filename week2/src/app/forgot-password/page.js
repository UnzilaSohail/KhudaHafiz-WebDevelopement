'use client';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const reset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg('Reset email sent');
    } catch (err) {
      setMsg('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Forgot Password</h2>
      <input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={reset}>Reset Password</button>
      <p>{msg}</p>
    </div>
  );
}
