import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useUser } from "../context/UserContext";
import { fetchAlbumById, fetchAllAlbums } from "../../utils/api";
import getLargerArtwork from "../../utils/getLargerArtwork";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../styles/coverflow-styling.css";

import { EffectCoverflow, Mousewheel } from "swiper/modules";
import ErrorPage from "../pages/ErrorPage";

function Coverflow() {
  const { user } = useUser();
  const [albums, setAlbums] = useState([]);
  const [top100Ids, setTop100Ids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchAllAlbums().then(({ data }) => {
      const ids = data.albums.map((album) => parseInt(album.id));
      setTop100Ids(ids);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const validFavouriteAlbumIds = user.favouriteAlbums.filter((id) => top100Ids.includes(id));

    const favouriteAlbumsPromises = validFavouriteAlbumIds.map((id) => fetchAlbumById(id));

    Promise.all(favouriteAlbumsPromises)
      .then((albumsData) => {
        const validAlbums = albumsData.filter((album) => album);
        const modifiedAlbums = validAlbums.map((data) => {
          const album = data.album;
          return {
            ...album,
            artworkUrl100: getLargerArtwork(album.artworkUrl100),
          };
        });
        setAlbums(modifiedAlbums);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [user.favouriteAlbums, top100Ids]);

  if (isLoading) {
    return <p className="text-center m-5">Loading Coverflow...</p>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (albums.length === 0) {
    return (
      <div className="bg-base-200 p-5">
        <p className="text-center mb-5">
          You currently have no albums in your favourites that are part of the top 100.
        </p>
        <p className="text-center mb-5">
          To add one, navigate to an album and press the heart button.
        </p>
        <p className="text-center">
          Albums will display as a coverflow. Albums that fall out of the top 100 will disappear
          from this list.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-200">
      <p className="text-center">Browse your favourite albums:</p>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 35,
          stretch: 1,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        mousewheel={{
          enabled: true,
        }}
        modules={[EffectCoverflow, Mousewheel]}
        className="mySwiper"
      >
        {albums.map((album) => (
          <SwiperSlide key={album.id}>
            <Link to={`/albums/${album.id}`}>
              <div className="flex flex-col items-center h-full">
                <img
                  src={album.artworkUrl100}
                  className="rounded"
                />
                <p className="text-center">{album.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Coverflow;
