import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";

function Map() {
  const navigate = useNavigate();

  const { cities } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([35.18994, -0.63085]);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={4}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
