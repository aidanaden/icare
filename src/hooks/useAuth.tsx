// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   User,
// } from "firebase/auth";

import { UserRole } from "@/enums";
import { LoginQueryData, QueryData, User } from "@/interfaces";
import { postAPI } from "@/lib/nominations";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, getCookies } from "cookies-next";

interface IAuth {
  user: User | undefined;
  signIn: (staff_id: string, password: string) => Promise<QueryData | void>;
  logout: () => Promise<QueryData | void>;
  refreshToken: () => Promise<LoginQueryData | void>;
}

const AuthContext = createContext<IAuth>({
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshToken: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const signIn = async (staff_id: string, password: string) => {
    const data = { staff_id: staff_id, password: password };
    const response = await postAPI<LoginQueryData>("AuthenticationToken", data);
    console.log("log in response data: ", response);

    const cookieUserRoles = getCookie("User_Role")?.toString();
    const userRoles = cookieUserRoles?.split("-") as UserRole[];

    const userValue = {
      staff_id: staff_id,
      name: response.name,
      role: userRoles,
    };
    setUser(userValue);

    return response;
  };

  const logout = async () => {
    const response = await postAPI("LogOut");
    console.log("logged out with response: ", response);
    if (response.Status_Code === 200) {
      setUser(undefined);
    }
    return response;
  };

  const refreshToken = async () => {
    return await postAPI<LoginQueryData>("RefreshToken");
  };

  // run refreshToken api call every 10 mins
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await refreshToken();
        if (response.status_code == 200) {
          console.log("successfully refreshed token with resp: ", response);
        }
      } catch (err) {
        console.error("Token failed to refresh with error: ", err);
      }
    }, 600000);

    // This represents the unmount function, in which you need
    // to clear your interval to prevent memory leaks.
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext);
}
