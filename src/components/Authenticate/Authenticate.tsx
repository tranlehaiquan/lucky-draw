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
  showLoading: noop,
  hideLoading: noop,
});

const Authenticate: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(login);
  const navigation = useNavigate();

  const handleLogin = async ({
    username,
    password,
    from,
  }: any): Promise<void> => {
    showLoading();
    try {
      const data = await mutation.mutateAsync({ username, password });
      const dataRs = data.data;
      if (dataRs) {
        setToken(dataRs);
        setAuth(dataRs);
        navigation(from === "/" ? "/draw" : from);
      } else {
        alert("Please try again!");
      }
    } catch (err) {
    } finally {
      hideLoading();
    }
  };
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <AuthenticateContext.Provider
      value={{ token, login: handleLogin, showLoading, hideLoading }}
    >
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-gray-300 bg-opacity-75 flex justify-center items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {children}
    </AuthenticateContext.Provider>
  );
};

export default Authenticate;
