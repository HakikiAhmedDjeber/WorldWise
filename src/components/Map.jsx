import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      map
      <p>
        position lat : {lat} and lng {lng}
      </p>
      <button
        onClick={() => {
          setSearchParams({ lat: 21, lng: 57 });
        }}
      >
        change Postion
      </button>
    </div>
  );
}

export default Map;
