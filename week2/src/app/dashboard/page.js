'use client';
import { useAuth } from "@/lib/authContext";
export default function HomePage() {
  const user = useAuth();

  return (
    <div className="home">
      {!user && <p>Welcome! Please log in or sign up.</p>}
      {user && (
        <>
          <h2>  <center>Welcome back to Khuda Hafiz</center></h2>
          <center><p>We offer respectful funeral services to support you and your family.</p></center>
        </>
      )}
    </div>
  );
}
