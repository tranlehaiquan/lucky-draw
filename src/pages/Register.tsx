import React, { useContext, useMemo, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { AuthenticateContext } from "../components/Authenticate";
import { Layout1 } from "../components/Layout";
import { TextInputFormik } from "../components/TextInput";
import banner from "../images/banner.png";
import shopRegister from "../services/shopRegister";

interface Props {
  className?: string;
}

const Login: React.FC<Props> = () => {
  const { showLoading, hideLoading } = useContext(AuthenticateContext);
  const [done, setDone] = useState(false);
  const schema = useMemo(() => {
    return yup.object().shape({
      storeName: yup.string().required("Name is required!"),
      storeCode: yup.string().required("Branch is required!"),
      email: yup.string().email().required("Email is reuqired!"),
      phoneNumber: yup.string().required("Phone is required!"),
      // fullName: yup.string().required("Họ tên bắt buộc!"),
      // address: yup.string().required("Địa chỉ là bắt buộc"),
    });
  }, []);

  return (
    <Layout1>
      <div className="md:hidden block">
        <img src={banner} className="w-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 h-full md:pt-60">
        <div className="h-full flex justify-center items-center">
          {!done && (
            <div className="w-full px-10 max-w-lg py-10">
              <h1 className="uppercase text-xl text-center text-white mb-2">
                Lucky Draw
              </h1>
              <Formik
                initialValues={{
                  storeName: "",
                  storeCode: "",
                  // fullName: "",
                  email: "",
                  phoneNumber: "",
                  // address: "",
                }}
                validationSchema={schema}
                onSubmit={async (values) => {
                  showLoading();
                  const dataRs = await shopRegister(values);
                  const { data } = dataRs;
                  if (data.success && data.message) {
                    setDone(true);
                  }
                  hideLoading();
                }}
              >
                {({ handleSubmit }) => (
                  <>
                    <label className="block">
                      <TextInputFormik
                        label={"Name"}
                        type="text"
                        name="storeName"
                        // placeholder={"Tên gian hàng"}
                        required
                      />
                    </label>
                    <label className="block">
                      <TextInputFormik
                        label={"Branch"}
                        type="text"
                        name="storeCode"
                        // placeholder={"Mã gian hàng"}
                        required
                      />
                    </label>
                    {/* <label className="block">
                      <TextInputFormik
                        label={"Họ tên"}
                        type="text"
                        name="fullName"
                        placeholder={"Họ tên"}
                        required
                      />
                    </label> */}
                    {/* <label className="block">
                      <TextInputFormik
                        label={"Địa chỉ"}
                        type="text"
                        name="address"
                        placeholder={"Địa chỉ"}
                        required
                      />
                    </label> */}
                    <label className="block">
                      <TextInputFormik
                        label={"Phone Number"}
                        type="text"
                        name="phoneNumber"
                        // placeholder={"Số điện thoại"}
                        required
                      />
                    </label>
                    <label className="block">
                      <TextInputFormik
                        label={"Email"}
                        type="text"
                        name="email"
                        // placeholder={"Email"}
                        required
                      />
                    </label>

                    <div className="text-center">
                      <button
                        className="bg-white px-5 py-2 rounded-lg mt-2"
                        onClick={() => handleSubmit()}
                      >
                        Confirm
                      </button>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          )}
          {done && (
            <div className="text-center mt-10 mb-10">
              <p className="text-4xl md:text-white mt-10">All done, Thank you!</p>
            </div>
          )}
        </div>
      </div>
    </Layout1>
  );
};

export default Login;
