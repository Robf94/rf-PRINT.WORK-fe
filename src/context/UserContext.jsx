import { createContext, useContext } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const user = {
    id: 1,
    name: "Joe Bloggs",
    favouriteAlbums: [111153953, 1743036652, 1772364192, 1664429596, 1439640317],
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
