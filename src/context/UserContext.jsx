import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const baseUser = {
    id: 1,
    name: "Joe Bloggs",
    favouriteAlbums: [
      663097964, 1762652806, 1743036652, 1772364192, 1664429596, 1439640317, 111153953,
    ],
    // I have added some valid but not currently in top 100 album ids above, which *should* not be displayed, nor throw any errors when coverflow is loaded
  };

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser ? storedUser : baseUser;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const setFavouriteAlbums = (updatedFavourites) => {
    setUser((prevUser) => ({
      ...prevUser,
      favouriteAlbums: updatedFavourites,
    }));
  };

  const toggleFavouriteAlbum = (albumId) => {
    setUser((prevUser) => {
      const isFavourite = prevUser.favouriteAlbums.includes(albumId);
      const updatedFavourites = isFavourite
        ? prevUser.favouriteAlbums.filter((id) => id !== albumId)
        : [...prevUser.favouriteAlbums, albumId];

      return { ...prevUser, favouriteAlbums: updatedFavourites };
    });
  };

  return (
    <UserContext.Provider value={{ user, toggleFavouriteAlbum, setFavouriteAlbums }}>
      {children}
    </UserContext.Provider>
  );
}
