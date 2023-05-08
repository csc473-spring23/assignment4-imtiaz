import React, { useState } from "react";
import AddressBar from "./components/AddressBar";
import NavBar from "./components/NavBar";
import { getLatLongForAddress } from "./geocode";
import getForecast from "./forecast";
import { Forecast } from "./types";
import "./main.css";

function App() {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  
  async function handleAddressSubmit(address: string){
    try{
      const {lat, long} = await getLatLongForAddress(address);
      const data = await getForecast(lat, long);
      setForecast(data);
    } catch (error){
      alert('Error: ${error.message}');
    }
  }
  
  return (
    <div className="container">
      <NavBar></NavBar>
      <AddressBar onAddressSubmit={async (address) => await handleAddressSubmit(address)} />
      {forecast && (
        <div>
          <h2 style={{color: "white"}}>Weather Forecast for {forecast.properties.periods[0].name}</h2>
          <div className="forecast-container">
            {forecast.properties.periods.slice(0, 14).map((period) => (
              <div key={period.number} className="forecast-item">
                <p>{period.name}</p>
                <p>
                  Temperature: {period.temperature} {period.temperatureUnit}
                </p>
                <p>{period.shortForecast}</p>
                <img src={period.icon} alt={period.shortForecast} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
  

export default App;
