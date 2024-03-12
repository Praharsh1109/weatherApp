import React, { useState } from "react";

export async function fetchData(setCityTemp: React.Dispatch<React.SetStateAction<string>>) {
  try {
    const result = await fetch("http://localhost:5000/info");
    const finalResult = await result.json();
    const temperature = finalResult.temperature;
    setCityTemp(temperature);
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error or set default value for temperature
  }
}

function App() {
  const [city, setCity] = useState<string>("");
  const [cityTemp, setCityTemp] = useState<string>("");

  const handleClick = () => {
    fetchData(setCityTemp);
  };

  return (
    <div>
      <p>Enter your City Name</p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleClick}>Click me</button>
      <div>{cityTemp}</div>
    </div>
  );
}

export default App;
