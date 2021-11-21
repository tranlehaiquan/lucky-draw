import React, { useContext, useMemo } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { AuthenticateContext } from "../components/Authenticate";
import { Layout1 } from "../components/Layout";
import { TextInputFormik } from "../components/TextInput";

interface Props {
  className?: string;
}

const Login: React.FC<Props> = () => {
  const { login } = useContext(AuthenticateContext);
  const schema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    });
  }, []);

  return (
    <Layout1>
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="h-full flex justify-center items-center">
          <div className="w-full px-10 max-w-lg">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                login(values)
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <label className="block mb-6">
                    <TextInputFormik
                      label={"Tên đăng nhập"}
                      type="text"
                      name="username"
                      placeholder={"Tên đăng nhập"}
                      required
                    />
                  </label>

                  <label className="block mb-6">
                    <TextInputFormik
                      label={"Mật khẩu"}
                      type="password"
                      name="password"
                      placeholder={"Mật khẩu"}
                      required
                    />
                  </label>

                  <div className="text-center">
                    <button
                      className="bg-white px-5 py-2 rounded-lg mt-2"
                      onClick={() => handleSubmit()}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout1>
  );
};

export default Login;
