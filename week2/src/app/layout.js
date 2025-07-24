// app/layout.js
import './globals.css';
import { AuthProvider } from '../lib/authContext';
import Navbar from './Navbar';

export const metadata = { title: 'Khuda Hafiz', description: 'Funeral Service App' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="root">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
