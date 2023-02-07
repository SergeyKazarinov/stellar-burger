import React, {FC, ReactNode} from "react";

interface AuthorizedRouteProps {
  children: ReactNode;
  path: string;
}

const AuthorizedRoute: FC<AuthorizedRouteProps> = ({children, ...rest}) => {

  return (
    <></>
  );
}

export default AuthorizedRoute;