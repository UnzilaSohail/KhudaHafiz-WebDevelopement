'use client';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../firebase';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', gender: '' });
  const [error, setError] = useState('');

  const signupUser = async () => {
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');

    try {
      const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(res.user, { displayName: form.username });
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: 'auto' }}>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <input placeholder="Confirm Password" type="password" onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
        <option>Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <button onClick={signupUser}>Sign Up</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
