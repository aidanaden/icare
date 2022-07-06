// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   User,
// } from "firebase/auth";

import { UserRole } from "@/enums";
import {
  CommitteeMemberListQueryData,
  LoginQueryData,
  QueryData,
  User,
} from "@/interfaces";
import { postAPI } from "@/lib/nominations";
import { createContext, useContext, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { FORGET_API_URL } from "@/constants";

interface IAuth {
  user: User | undefined;
  signIn: (staff_id: string, password: string) => Promise<QueryData | void>;
  logout: () => Promise<QueryData | void>;
  refreshToken: () => Promise<LoginQueryData | void>;
  forgetPassword: (staff_id: string) => Promise<number | void>;
}

const AuthContext = createContext<IAuth>({
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshToken: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  forgetPassword: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const signIn = async (staff_id: string, password: string) => {
    const data = { staff_id: staff_id, password: password };
    const response = await postAPI<LoginQueryData>("AuthenticationToken", data);

    const cookieUserRoles = getCookie("User_Role")?.toString();
    const userRoles = cookieUserRoles?.split("-") as UserRole[];

    const committeeMembersData = await postAPI<CommitteeMemberListQueryData>(
      "RetrieveCommitteeMembers"
    );

    const userValue: User = {
      staff_id: staff_id,
      name: response.name,
      role: userRoles,
      year: response.current_financial_year,
      committeeMembers: committeeMembersData.committee_member_list,
    };

    setUser(userValue);
    return response;
  };

  const logout = async () => {
    const response = await postAPI("LogOut");
    if (response.Status_Code === 200) {
      setUser(undefined);
    }
    return response;
  };

  const refreshToken = async () => {
    return await postAPI<LoginQueryData>("RefreshToken");
  };

  const forgetPassword = async (staff_id: string) => {
    const body = { staff_id: staff_id };
    const response = await axios({
      url: `${FORGET_API_URL}`,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(body),
    });
    return response.status;
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, logout, refreshToken, forgetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext);
}
