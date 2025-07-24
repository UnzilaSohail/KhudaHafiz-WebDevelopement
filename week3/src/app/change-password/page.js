'use client';
import { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const [newPass, setNewPass] = useState('');
  const router = useRouter();

  const handleChangePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPass);
      alert('Password changed successfully!');
      router.push('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <button onClick={handleChangePassword}>Submit</button>

      <style jsx>{`
        .container {
          box-sizing: border-box;
          max-width: 400px;
          margin: 100px auto;
          text-align: center;
          padding: 30px;
          background-color: #fdf9f2;
          border: 1px solid #8b5e3c;
          border-radius: 10px;
        }

        h2 {
          color: #4e342e;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          padding: 12px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          padding: 10px 20px;
          background-color: #8b5e3c;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #6d4228;
        }
      `}</style>
    </div>
  );
}
