import { useState, useEffect } from "react";
import { fetchAllAlbums } from "../../utils/api";
import CountrySelector from "../components/CountrySelector";
import Loader from "../components/Loader";

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
    setCountryCode(selectedCountry);
  };

  return (
    <>
      <div className="album-search-container bg-primary px-2 py-5 md:py-10 lg:px-44 2xl:px-96 flex flex-col justify-center items-center">
        <h1 className="text-h1 text-center text-white mb-5">Browse albums by country</h1>
        <CountrySelector
          selectedCountry={countryCode}
          onCountryChange={handleCountryChange}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 gap-2 m-2 md:my-10 lg:mx-44 2xl:mx-96">
          {albums.map((album, index) => (
            <article key={index} className="card bg-neutral shadow-xl overflow-hidden">
              <div className="flex flex-row justify-between items-center">
                <div className="flex items-center justify-center w-10 h-10 ml-5 rounded-full grow-0 shrink-0 album-card-digit bg-primary">
                  <h3 className="text-white">{index + 1}</h3>
                </div>

                <div className="text-wrapper flex-1 mx-5 my-2 overflow-scroll">
                  <h3 className="text-h4 line-clamp-2 font-bold">{album.name}</h3>
                  <p className="truncate">{album.artistName}</p>
                </div>
                <img
                  src={album.artworkUrl100}
                  className="h-full"
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default BrowseCountries;
