import React, { useEffect, useState } from "react";
import {
  RiUser3Line,
  RiPhoneLine,
  RiMailLine,
  RiBankLine,
  RiBankCardLine,
  RiGitCommitLine,
  RiAccountPinBoxLine,
  RiBarcodeBoxLine,
} from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { profileApi, profileUpdateApi } from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";

function Profile(props) {
  const [profile, setProfile] = useState([]);
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    checkStorage();
  }, []);
  useEffect(() => {
    profileApi()
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((e) => {
        console.log(e.response);
      });
    setLoader(false);
  }, []);

  function checkStorage() {
    const storedData = localStorage.getItem("api_token");
    if (storedData) {
      profileApi()
        .then((res) => {
          if (res.data.status === "0") {
            props.history.push("/login");
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } else {
      props.history.push("/login");
    }
  }
  const formik = useFormik({
    initialValues: {
      name: profile.name ? profile.name : "",
      phone: profile.phone ? profile.phone : "",
      email: profile.email ? profile.email : "",
      bank_name: profile.bank_name ? profile.bank_name : "",
      branch: profile.branch ? profile.branch : "",
      account_no: profile.account_no ? profile.account_no : "",
      account_holder_name: profile.account_holder_name
        ? profile.account_holder_name
        : "",
      ifsc: profile.ifsc ? profile.ifsc : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Username Required!"),
      phone: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .min(10, "Too Short!")
        .max(10, "Too Long!")
        .required("Phone Number Required"),
      email: Yup.string().email("Invalid Email").required("Email Required!"),
      bank_name: Yup.string().required("Bank Name Required!"),
      branch: Yup.string().required("Branch Name Required!"),
      account_no: Yup.string()
        .matches(
          /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
          "Account number is not valid"
        )
        .max(16, "Too Long!")
        .required("Account Number Required!"),
      account_holder_name: Yup.string().required(
        "Account Holder Name Required!"
      ),
      ifsc: Yup.string().required("IFSC Required!"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { setErrors }) => {
      setLoader(true);
      profileUpdateApi(values).then((res) => {
        if (res.data.status === "0") {
          setErrors(res.data);
        } else {
          alert("Success");
        }
      });
      setLoader(false);
    },
  });
  return (
    <div className="container">
      {loader && <LoaderMini />}
      <div className="row" style={{ paddingTop: "50px" }}>
        <div className="col-lg-5 col-xl-6 mx-auto">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-body p-4 p-sm-5">
              <h4 className="card-title text-center mb-2 fw-light fs-5">
                Profile
              </h4>
              <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="floatingInputEmail"
                    placeholder="Name"
                    autoComplete="off"
                    {...formik.getFieldProps("name")}
                  />
                  <RiUser3Line />
                </div>
                {formik.errors.name && formik.touched.name ? (
                  <small className="text-danger">{formik.errors.name}</small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Phone Number"
                    {...formik.getFieldProps("phone")}
                  />
                  <RiPhoneLine />
                </div>
                {formik.errors.phone && formik.touched.phone ? (
                  <small className="text-danger">{formik.errors.phone}</small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    placeholder="Email Address"
                    {...formik.getFieldProps("email")}
                  />
                  <RiMailLine />
                </div>
                {formik.errors.email && formik.touched.email ? (
                  <small className="text-danger">{formik.errors.email}</small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Bank Name"
                    {...formik.getFieldProps("bank_name")}
                  />
                  <RiBankLine />
                </div>
                {formik.errors.bank_name && formik.touched.bank_name ? (
                  <small className="text-danger">
                    {formik.errors.bank_name}
                  </small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Branch Name"
                    {...formik.getFieldProps("branch")}
                  />
                  <RiGitCommitLine />
                </div>
                {formik.errors.branch && formik.touched.branch ? (
                  <small className="text-danger">{formik.errors.branch}</small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Account Number"
                    {...formik.getFieldProps("account_no")}
                  />
                  <RiBankCardLine />
                </div>
                {formik.errors.account_no && formik.touched.account_no ? (
                  <small className="text-danger">
                    {formik.errors.account_no}
                  </small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Account Holder Name"
                    {...formik.getFieldProps("account_holder_name")}
                  />
                  <RiAccountPinBoxLine />
                </div>
                {formik.errors.account_holder_name &&
                formik.touched.account_holder_name ? (
                  <small className="text-danger">
                    {formik.errors.account_holder_name}
                  </small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="IFSC"
                    {...formik.getFieldProps("ifsc")}
                  />
                  <RiBarcodeBoxLine />
                </div>
                {formik.errors.ifsc && formik.touched.ifsc ? (
                  <small className="text-danger">{formik.errors.ifsc}</small>
                ) : null}

                <div className="d-grid mt-3">
                  <button
                    className="btn btn-primary rounded-pill input-block-level form-control"
                    type="submit"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
