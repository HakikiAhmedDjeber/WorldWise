import CountryFlag from "./CountryFlag";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <CountryFlag countryCode={country.emoji} />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
