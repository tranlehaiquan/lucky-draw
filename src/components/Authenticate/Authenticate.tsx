import React, { useState } from "react";
import noop from "lodash/noop";
import { useMutation } from "react-query";
import login from "../../services/login";
import { useNavigate } from "react-router";
import { setAuth } from "../../services/axios";

interface Props {
  className?: string;
}

export const AuthenticateContext = React.createContext({
  token: "",
  login: noop,
});

const Authenticate: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState("");
  const mutation = useMutation(login);
  const navigation = useNavigate();

  const handleLogin = async ({ username, password, from }: any): Promise<void> => {
    const data = await mutation.mutateAsync({ username, password });
    const dataRs = data.data;
    if(dataRs) {
      setToken(dataRs);
      setAuth(dataRs);
      navigation(from || '/')
    } else {
      alert('Please try again!');
    }
  };

  return (
    <AuthenticateContext.Provider value={{ token, login: handleLogin }}>
      {children}
    </AuthenticateContext.Provider>
  );
};

export default Authenticate;
