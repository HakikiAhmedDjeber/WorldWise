// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryFlag from "./CountryFlag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useURLPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [id, setId] = useState(null);
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:9000/cities", {
      method: "POST",
      body: JSON.stringify({
        cityName: cityName,
        country: country,
        emoji: emoji,
        date: date.toDateString(),
        notes: notes,
        position: {
          lat: lat,
          lng: lng,
        },
      }),
    });
    navigate("/app/cities");
  }

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function getGeoData() {
        try {
          setIsGeoLoading(true);
          setGeoError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click someWhere else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(data.countryCode);
          setId(data.id);
        } catch (err) {
          setGeoError(err.message);
        } finally {
          setIsGeoLoading(false);
        }
      }
      getGeoData();
    },
    [lat, lng]
  );

  if (isGeoLoading) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map!"} />;
  if (geoError) return <Message message={geoError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <CountryFlag countryCode={emoji} size={24} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate("/app");
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
