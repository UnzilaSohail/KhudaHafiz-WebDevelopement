'use client';
import { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth } from '../firebase';
export default function AccountPage() {
  const [newPass, setNewPass] = useState('');
  const [msg, setMsg] = useState('');

  const changePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPass);
      setMsg('Password changed successfully');
    } catch (err) {
      setMsg('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <input type="password" placeholder="New Password" onChange={(e) => setNewPass(e.target.value)} />
      <button onClick={changePassword}>Change Password</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}
