function CountryFlag({ countryCode, size = 64 }) {
  return (
    <img src={`https://flagsapi.com/${countryCode}/flat/${size}.png`}></img>
  );
}

export default CountryFlag;
