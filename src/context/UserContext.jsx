import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const baseUser = {
    id: 1,
    name: "Joe Bloggs",
    favouriteAlbums: [1743036652, 1772364192, 1664429596, 1439640317],
  };

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser || baseUser;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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
    <UserContext.Provider value={{ user, toggleFavouriteAlbum }}>{children}</UserContext.Provider>
  );
}
