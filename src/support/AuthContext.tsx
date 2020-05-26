import React from "react";
import { useState } from "react";

const AuthContext = React.createContext<any>(undefined);

type Props = { children: any };

const AuthContextProvider: React.FC<Props> = (props: Props) => {
  const initialState = undefined;
  const [user, setUser] = useState(initialState);

  return <AuthContext.Provider value={[user, setUser]}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
