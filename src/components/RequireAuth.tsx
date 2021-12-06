import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type Prop = {
  redirectTo: string;
  children: ReactJSXElement;
};

const RequireAuth = ({ redirectTo, children }: Prop) => {
  const { token } = useSelector((state: User) => state.user);

  return (token !== "" && token !== null) ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;

export const RequireNoAuth = ({ redirectTo, children }: Prop) => {
  const { token } = useSelector((state: User) => state.user);

  return (token === "" || token == null) ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};
