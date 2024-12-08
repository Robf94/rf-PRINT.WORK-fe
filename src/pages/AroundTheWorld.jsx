import { useState, useEffect } from "react";
import { fetchAllAlbums } from "../../utils/api";
import CountrySelector from "../components/CountrySelector";

function BrowseCountries() {
  const [countryCode, setCountryCode] = useState("gb");
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllAlbums(countryCode)
      .then(({ data }) => {
        setAlbums(data.albums);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [countryCode]);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    console.log("selected:", selectedCountry);
    setCountryCode(selectedCountry);
  };

  return (
    <>
      <h1>Browse albums by country</h1>
      <CountrySelector
        selectedCountry={countryCode}
        onCountryChange={handleCountryChange}
      />

      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.name}</li>
        ))}
      </ul>
    </>
  );
}

export default BrowseCountries;
