// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   User,
// } from "firebase/auth";

import { UserRole } from "@/enums";
import { User } from "@/interfaces";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface IAuth {
  user: User | undefined;
  signIn: (email: string, password: string) => Promise<void>;
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
  const [user, setUser] = useState<User | undefined>({
    staff_id: "124123123",
    name: "sample user",
    role: UserRole.COMMITTEE,
  });
  const [error, setError] = useState(undefined);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(
  //   () =>
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         // Logged in...
  //         setUser(user);
  //         setLoading(false);
  //       } else {
  //         // Not logged in...
  //         setUser(null);
  //         setLoading(true);
  //         router.push("/login");
  //       }

  //       setInitialLoading(false);
  //     }),
  //   [auth]
  // );

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // await signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     setUser(userCredential.user);
    //     router.push("/");
    //     setLoading(false);
    //   })
    //   .catch((error) => alert(error.message))
    //   .finally(() => setLoading(false));
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
