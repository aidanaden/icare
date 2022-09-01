/* eslint-disable @typescript-eslint/no-empty-function */
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
  sessionTokenStart: Date | undefined;
  signIn: (staff_id: string, password: string) => Promise<QueryData | void>;
  logout: () => Promise<QueryData | void>;
  refreshToken: () => Promise<LoginQueryData | void>;
  validateToken: () => Promise<boolean>;
  forgetPassword: (staff_id: string) => Promise<number | void>;
}

const AuthContext = createContext<IAuth>({
  user: undefined,
  sessionTokenStart: undefined,
  signIn: async () => {},
  logout: async () => {},
  refreshToken: async () => {},
  validateToken: async () => {
    return false;
  },
  forgetPassword: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [sessionTokenStart, setSessionTokenStart] = useState<Date | undefined>(
    undefined
  );

  const signIn = async (staff_id: string, password: string) => {
    const data = { staff_id: staff_id, password: password };
    const response = await postAPI<LoginQueryData>("AuthenticationToken", data);

    const cookieUserRoles = getCookie("User_Role")?.toString();
    const userRoles = cookieUserRoles?.includes("-")
      ? (cookieUserRoles?.split("-") as UserRole[])
      : ([cookieUserRoles] as UserRole[]);

    const committeeMembersData = await postAPI<CommitteeMemberListQueryData>(
      "RetrieveCommitteeMembers"
    );

    localStorage.setItem("staff_id", staff_id);
    localStorage.setItem(
      "current_financial_year",
      response.current_financial_year
    );

    const userValue: User = {
      staff_id: staff_id,
      name: response.name,
      role: userRoles,
      year: response.current_financial_year,
      committeeMembers: committeeMembersData.committee_member_list,
    };

    setUser(userValue);
    setSessionTokenStart(new Date());
    return response;
  };

  const logout = async () => {
    const response = await postAPI("LogOut");
    if (response.Status_Code === 200) {
      localStorage.setItem("staff_id", "");
      localStorage.setItem("current_financial_year", "");
      setUser(undefined);
      setSessionTokenStart(undefined);
    }
    return response;
  };

  const refreshToken = async () => {
    return await postAPI<LoginQueryData>("RefreshToken");
  };

  const validateToken = async () => {
    try {
      const response = await postAPI<QueryData>("ValidateToken");
      console.log("response data: ", response);

      if (response.status_code !== 200) {
        console.error("failed to validate user");
        return false;
      }

      const cookieName = getCookie("Name")?.toString().replaceAll("+", " ");
      const cookieUserRoles = getCookie("User_Role")?.toString();
      const userRoles = cookieUserRoles?.split("-") as UserRole[];

      const committeeMembersData = await postAPI<CommitteeMemberListQueryData>(
        "RetrieveCommitteeMembers"
      );

      const userValue: User = {
        staff_id: localStorage.getItem("staff_id") as string,
        name: cookieName as string,
        role: userRoles,
        year: localStorage.getItem("current_financial_year") as string,
        committeeMembers: committeeMembersData.committee_member_list,
      };

      setUser(userValue);
      setSessionTokenStart(new Date());
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
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
      value={{
        user,
        sessionTokenStart,
        signIn,
        logout,
        refreshToken,
        validateToken,
        forgetPassword,
      }}
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
