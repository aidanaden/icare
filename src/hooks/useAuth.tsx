// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   User,
// } from "firebase/auth";

import { UserRole } from "@/enums";
import { User } from "@/interfaces";
import { postAPI } from "@/lib/nominations";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface IAuth {
  user: User | undefined;
  signIn: (staff_id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | undefined;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: async () => {},
  error: undefined,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  // const [user, setUser] = useState<User | undefined>({
  //   staff_id: "124123123",
  //   name: "sample user",
  //   role: UserRole.COMMITTEE,
  // });
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState(undefined);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("user value has changed: ", user);
  }, [user]);

  const signIn = async (staff_id: string, password: string) => {
    setLoading(true);
    const data = { staff_id: staff_id, password: password };
    const userData = { Name: "test user", User_Role: "HOD" };
    // const userData = await postAPI("AuthenticationToken", data);
    console.log("log in response data: ", userData);
    setLoading(false);
    setUser({
      staff_id: staff_id,
      name: userData.Name,
      role: userData.User_Role as UserRole,
    });
    router.push("/dashboard");
  };

  const logout = async () => {
    setLoading(true);

    // signOut(auth)
    //   .then(() => {
    //     setUser(null);
    //   })
    //   .catch((error) => alert(error.message))
    //   .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({ user, signIn, error, loading, logout }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext);
}
