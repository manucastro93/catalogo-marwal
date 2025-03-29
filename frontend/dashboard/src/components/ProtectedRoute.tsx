import { Component, JSX } from "solid-js";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "@solidjs/router";

const ProtectedRoute: Component<{ children: JSX.Element }> = (props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate href="/login" />;
  }

  return props.children;
};

export default ProtectedRoute;