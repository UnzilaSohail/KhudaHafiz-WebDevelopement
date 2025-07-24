'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import ChatBot from "../Components/Chatbot";


export default function HomePage() {
  const user = useAuth();
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="home" style={{ padding: "2rem" }}>
      {!user ? (
        <p style={{ textAlign: "center" }}>Welcome! Please log in or sign up.</p>
      ) : (
        <>
          <h2 style={{ textAlign: "center", color: "#4e342e" }}>
            Welcome back to <strong>Khuda Hafiz</strong>
          </h2>
          <p style={{ textAlign: "center", marginBottom: "2rem" }}>
            We offer respectful funeral services to support you and your family.
          </p>

         <ChatBot/>
        </>
      )}
    </div>
  );
}
