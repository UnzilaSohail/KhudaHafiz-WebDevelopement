'use client';
import { useState } from "react";

export default function ChatBot() {
    const [tab, setTab] = useState("chat");
    const [messages, setMessages] = useState([
        { from: "bot", text: "Assalamualaikum! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [city, setCity] = useState("Islamabad");

    const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    const fetchGeminiResponse = async (userInput) => {
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userInput }), // ✅ Fixed here
            });

            const data = await res.json();



            return data.reply || "Sorry, I didn't get a response.";
        } catch (err) {
            console.error("Gemini API Error:", err);
            return "Sorry, something went wrong while contacting Gemini.";
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { from: "user", text: userMessage }]);
        setInput("");
        setLoading(true);

        let botReply = "Sorry, I didn't understand that.";

        if (userMessage.toLowerCase().includes("weather")) {
            setTab("weather");
            await fetchWeather(city);
            botReply = `Fetching weather for ${city}...`;
        } else {
            botReply = await fetchGeminiResponse(userMessage);
        }

        setMessages(prev => [...prev, { from: "bot", text: botReply }]);
        setLoading(false);
    };

    const fetchWeather = async (cityName = "lahore") => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHER_API_KEY}&units=metric`;
            const res = await fetch(url);
            const data = await res.json();

            if (data && data.main) {
                setWeatherInfo({
                    city: cityName,
                    temp: data.main.temp,
                    desc: data.weather[0].description,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                });
            } else {
                setWeatherInfo({ error: "Could not fetch weather data." });
            }
        } catch (error) {
            setWeatherInfo({ error: "Error fetching weather." });
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
            {/* Tabs */}
            <div style={{ display: "flex", marginBottom: "1rem" }}>
                <button
                    onClick={() => setTab("chat")}
                    style={{
                        flex: 1,
                        padding: "0.5rem",
                        background: tab === "chat" ? "#6d4c41" : "#ddd",
                        color: tab === "chat" ? "#fff" : "#000",
                        border: "none",
                        borderRadius: "6px 0 0 6px",
                        cursor: "pointer",
                    }}
                >
                    💬 Chatbot
                </button>
                <button
                    onClick={() => {
                        setTab("weather");
                        fetchWeather(city);
                    }}
                    style={{
                        flex: 1,
                        padding: "0.5rem",
                        background: tab === "weather" ? "#6d4c41" : "#ddd",
                        color: tab === "weather" ? "#fff" : "#000",
                        border: "none",
                        borderRadius: "0 6px 6px 0",
                        cursor: "pointer",
                    }}
                >
                    🌤 Weather
                </button>
            </div>

            {/* Chat Tab */}
            {tab === "chat" && (
                <>
                    <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ textAlign: msg.from === "user" ? "right" : "left", margin: "0.5rem 0" }}>
                                <span
                                    style={{
                                        display: "inline-block",
                                        background: msg.from === "user" ? "#d1e7dd" : "#e9ecef",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "10px",
                                    }}
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask something..."
                            style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                        <button onClick={handleSend} disabled={loading} style={{ width: "60px", height: "32px", padding: "3px" }}>
                            {loading ? "..." : "Send"}
                        </button>
                    </div>
                </>
            )}

            {/* Weather Tab */}
            {tab === "weather" && (
                <div style={{ padding: "1rem", borderRadius: "8px" }}>
                    <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city"
                            style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                        <button onClick={() => fetchWeather(city)} style={{ padding: "2px", width: "60px", height: "30px" }}>
                            Search
                        </button>
                    </div>
                    {weatherInfo ? (
                        weatherInfo.error ? (
                            <p>{weatherInfo.error}</p>
                        ) : (
                            <div
                                style={{
                                    background: "#fff",
                                    border: "1px solid #ccc",
                                    borderRadius: "10px",
                                    padding: "1rem",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                            >
                                <h4 style={{ marginTop: 0 }}>🌤 Weather in {weatherInfo.city}</h4>
                                <p><strong>Temperature:</strong> {weatherInfo.temp}°C</p>
                                <p><strong>Condition:</strong> {weatherInfo.desc}</p>
                                <p><strong>Humidity:</strong> {weatherInfo.humidity}%</p>
                                <p><strong>Wind Speed:</strong> {weatherInfo.wind} m/s</p>
                            </div>

                        )
                    ) : (
                        <p>Loading weather...</p>
                    )}
                </div>
            )}
        </div>
    );
}
