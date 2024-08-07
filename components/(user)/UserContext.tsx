import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";

type UserContextType = {
  user: User | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("Must be used within a UserProvider")
    }
    return context;
}

export default UserContext;
