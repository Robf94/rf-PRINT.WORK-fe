import { createContext, useContext } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const user = {
    id: 1,
    name: "Joe Bloggs",
    favouriteAlbums: [1772364192, 1664429596],
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
