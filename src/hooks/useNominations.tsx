// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   User,
// } from "firebase/auth";

import {
  NominationFormSubmissionData,
  NominationDetailQueryData,
  User,
} from "@/interfaces";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface INominations {
  nominations: NominationDetailQueryData[] | undefined;
  endorsements?: NominationDetailQueryData[] | undefined;
  committeeNominations?: NominationDetailQueryData[] | undefined;
  fetchNominations: (id: string) => Promise<NominationDetailQueryData[] | void>;
  fetchEndorsements: (
    id: string
  ) => Promise<NominationDetailQueryData[] | void>;
  fetchCommitteeNominations: (
    id: string
  ) => Promise<NominationDetailQueryData[] | void>;
  error: string | undefined;
  loading: boolean;
}

const NominationsContext = createContext<INominations>({
  nominations: undefined,
  endorsements: undefined,
  committeeNominations: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchNominations: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchEndorsements: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchCommitteeNominations: async () => {},
  error: undefined,
  loading: false,
});

interface NominationsProviderProps {
  children: React.ReactNode;
}

export const NominationsProvider = ({ children }: NominationsProviderProps) => {
  const router = useRouter();
  const [nominations, setNominations] = useState<
    NominationDetailQueryData[] | undefined
  >(undefined);
  const [endorsements, setEndorsements] = useState<
    NominationDetailQueryData[] | undefined
  >(undefined);
  const [committeeNominations, setCommitteeNominations] = useState<
    NominationDetailQueryData[] | undefined
  >(undefined);
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

  const fetchNominations = async (id: string) => {
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

  const fetchEndorsements = async (id: string) => {
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

  const fetchCommitteeNominations = async (id: string) => {
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
    () => ({
      nominations,
      endorsements,
      committeeNominations,
      fetchNominations,
      fetchEndorsements,
      fetchCommitteeNominations,
      error,
      loading,
      logout,
    }),
    [nominations, endorsements, committeeNominations, error, loading]
  );

  return (
    <NominationsContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </NominationsContext.Provider>
  );
};

// Let's only export the `useNominations` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useNominations() {
  return useContext(NominationsContext);
}
