import React, { useContext, useMemo, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { AuthenticateContext } from "../components/Authenticate";
import { Layout1 } from "../components/Layout";
import { TextInputFormik } from "../components/TextInput";
import banner from "../images/banner.jpeg";
import shopRegister from "../services/shopRegister";

interface Props {
  className?: string;
}

const Login: React.FC<Props> = () => {
  const { showLoading, hideLoading } = useContext(AuthenticateContext);
  const [done, setDone] = useState(false);
  const schema = useMemo(() => {
    return yup.object().shape({
      storeName: yup.string().required('Tên cửa hàng là bắt buộc!'),
      storeCode: yup.string().required('Mã cửa hàng là bắt buộc!'),
      fullName: yup.string().required('Họ tên bắt buộc!'),
      email: yup.string().required('Email là bắt buộc!'),
      phoneNumber: yup.string().required('Số điện thoại là bắt buộc!'),
      address: yup.string().required('Địa chỉ là bắt buộc'),
    });
  }, []);

  return (
    <Layout1>
      <div className="md:hidden block">
        <img src={banner} className="w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="h-full flex justify-center items-center">
          {!done && <div className="w-full px-10 max-w-lg py-10">
            <h1 className="uppercase text-xl text-center text-white md:text-black mb-2">
              Thôn tin nhà bán hàng cần cung cấp
            </h1>
            <Formik
              initialValues={{
                storeName: "",
                storeCode: "",
                fullName: "",
                email: "",
                phoneNumber: "",
                address: "",
              }}
              validationSchema={schema}
              onSubmit={async (values) => {
                showLoading();
                const dataRs = await shopRegister(values);
                const { data } = dataRs;
                if(data.success && data.message) {
                  alert(data.message);
                  setDone(true);
                }
                hideLoading();
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <label className="block mb-6">
                    <TextInputFormik
                      label={"Tên gian hàng"}
                      type="text"
                      name="storeName"
                      placeholder={"Tên gian hàng"}
                      required
                    />
                  </label>
                  <label className="block mb-6">
                    <TextInputFormik
                      label={"Mã gian hàng"}
                      type="text"
                      name="storeCode"
                      placeholder={"Mã gian hàng"}
                      required
                    />
                  </label>
                  <label className="block mb-6">
                    <TextInputFormik
                      label={"Họ tên"}
                      type="text"
                      name="fullName"
                      placeholder={"Họ tên"}
                      required
                    />
                  </label>
                  <label className="block mb-6">
                    <TextInputFormik
                      label={"Địa chỉ"}
                      type="text"
                      name="address"
                      placeholder={"Địa chỉ"}
                      required
                    />
                  </label>
                  <label className="block mb-6">
                    <TextInputFormik
                      label={"Số điện thoại"}
                      type="text"
                      name="phoneNumber"
                      placeholder={"Số điện thoại"}
                      required
                    />
                  </label>
                  <label className="block mb-6">
                    <TextInputFormik
                      label={"Email"}
                      type="text"
                      name="email"
                      placeholder={"Email"}
                      required
                    />
                  </label>

                  <div className="text-center">
                    <button
                      className="bg-white px-5 py-2 rounded-lg mt-2"
                      onClick={() => handleSubmit()}
                    >
                      Đăng ký
                    </button>
                  </div>
                </>
              )}
            </Formik>
          </div>}
          {done && <p className="text-xl md:text-white">Cảm ơn bạn đã đăng ký!</p>}
        </div>
      </div>
    </Layout1>
  );
};

export default Login;
