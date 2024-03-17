import React, { useState } from "react";

async function fetchData(
  city: string,
  setCityTemp: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    const result = await fetch(
      `http://localhost:5000/info?city=${encodeURIComponent(city)}`
    );
    const finalResult = await result.json();
    const temperature = finalResult.temperature;
    setCityTemp(temperature);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function App() {
  const [city, setCity] = useState<string>("");
  const [cityTemp, setCityTemp] = useState<string>("");

  const handleClick = () => {
    fetchData(city, setCityTemp);
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <p className="font-extrabold text-4xl">Enter your City Name</p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="px-4 py-2 my-8 border border-gray-300 rounded mr-2"
      />
      <button onClick={handleClick} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Click me</button>
      <div className="text-4xl font-bold"> Temperature is : {cityTemp}</div>
    </div>
  </div>
  

  );
}

export default App;
