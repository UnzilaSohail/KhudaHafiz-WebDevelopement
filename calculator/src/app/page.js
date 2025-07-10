'use client';
import { useState } from 'react';

export default function CutesyCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const calculate = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
    } catch {
      setResult('Oops!');
    }
  };

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffeef8', 
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
      }}
    >
      <div
        style={{
          background: '#fff0f6',
          borderRadius: '20px',
          padding: '30px',
          width: '320px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#d63384',
            marginBottom: '20px',
            fontSize: '24px',
          }}
        >
          Calculator 
        </h2>

        <input
          type="text"
          value={input}
          readOnly
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '20px',
            borderRadius: '12px',
            border: '2px solid #f8c8dc',
            marginBottom: '10px',
            backgroundColor: '#fffafc',
            color: '#d63384',
          }}
        />

        {result && (
          <div
            style={{
              fontSize: '18px',
              color: '#a61e4d',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
             Result: <strong>{result}</strong>
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
        >
          {['7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '0', '.', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => (btn === '=' ? calculate() : handleClick(btn))}
                style={{
                  padding: '14px',
                  fontSize: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#fcd5ce',
                  border: 'none',
                  color: '#6a0572',
                  cursor: 'pointer',
                  transition: 'transform 0.1s ease',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
              >
                {btn}
              </button>
            ))}

          <button
            onClick={clearInput}
            style={{
              gridColumn: 'span 4',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '12px',
              backgroundColor: '#ffd6e0',
              color: '#8a0f46',
              border: 'none',
              marginTop: '10px',
              cursor: 'pointer',
            }}
          >
           Clear All
          </button>
        </div>
      </div>
    </main>
  );
}
