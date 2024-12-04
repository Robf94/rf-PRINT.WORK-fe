import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useUser } from "../context/UserContext";
import { fetchAlbumById } from "../../utils/api";
import getLargerArtwork from "../../utils/getLargerArtwork";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../coverflow-styling.css";

import { EffectCoverflow, Mousewheel } from "swiper/modules";
import Loader from "./Loader";

function Coverflow() {
  const user = useUser();
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    // What happens when album falls out of top 100?

    const favouriteAlbumsPromises = user.favouriteAlbums.map((id) => fetchAlbumById(id));

    Promise.all(favouriteAlbumsPromises)
      .then((albums) => {
        const modifiedAlbums = albums.map((data) => {
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
        console.log(err);
        setIsError(true);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        mousewheel={{
          enabled: true,
          sensitivity: 4,
        }}
        modules={[EffectCoverflow, Mousewheel]}
        className="mySwiper"
      >
        {albums.map((album) => (
          <SwiperSlide key={album.id}>
            <img src={album.artworkUrl100} />
            <p className="text-center">{album.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Coverflow;
