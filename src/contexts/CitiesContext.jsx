import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.log("error fetching cities ...");
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);
  return (
    <CitiesContext.Provider value={{ cities: cities, isLoading: isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCites context was use outside the cities provider");
  return context;
}

export { CitiesProvider, useCities };
