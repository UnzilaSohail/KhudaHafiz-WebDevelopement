'use client';
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = "64a84785d438a53593710a01c8c732ce"; //openweather api key

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}> My Weather App </h1>
      <form onSubmit={getWeather} style={styles.form}>
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Show Weather
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.card}>
          <h2 style={styles.city}>
            {weather.name}, {weather.sys.country}
          </h2>
          <p style={styles.detail}> Temperature: {weather.main.temp}°C</p>
          <p style={styles.detail}> Condition: {weather.weather[0].main}</p>
          <p style={styles.detail}> Description: {weather.weather[0].description}</p>
          <p style={styles.detail}> Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </main>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Comic Sans MS, sans-serif',
    textAlign: 'center',
    background: '#00424b',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#83b6b5',
  },
  form: {
    marginBottom: '1.5rem',
  },
  input: {
    padding: '0.6rem 1rem',
    border: '1px solid  #83b6b5',
    borderRadius: '20px',
    width: '200px',
    marginRight: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.6rem 1.2rem',
    borderRadius: '20px',
    border: 'none',
    background: 'skyblue',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    color: '#d6336c',
    fontWeight: 'bold',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '20px',
    boxShadow: '0 0 10px #83b6b5',
    display: 'inline-block',
  },
  city: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#07364a',
  },
  detail: {
    fontSize: '1.1rem',
    margin: '0.3rem 0',
    color: 'black'
  },
};
