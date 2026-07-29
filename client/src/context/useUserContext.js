import { useContext } from "react";
import { UserContext } from "./UserContext";

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used within UserProvider");
  return ctx;
}
