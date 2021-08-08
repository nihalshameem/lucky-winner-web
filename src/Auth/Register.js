import React, { useEffect } from "react";
import {
  RiUser3Line,
  RiLock2Line,
  RiMailLine,
  RiPhoneLine,
  RiRotateLockLine,
} from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { loginApi, profileApi, registerApi } from "../Components/APIConst";

function Register(props) {
  useEffect(() => {
    checkStorage();
  }, []);
  function checkStorage() {
    const storedData = localStorage.getItem("api_token");
    if (storedData) {
      profileApi()
        .then((res) => {
          if (res.data.status !== "0") {
            props.history.push("/");
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name Required!"),
      email: Yup.string()
        .required("Email Required!")
        .email("Enter a valid email"),
      phone: Yup.string()
        .required("Phone Number Required!")
        .min(10, "Invalid Phone Number!")
        .max(10, "Invalid Phone Number!")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        ),
      password: Yup.string()
        .min(4, "Too Short!")
        .max(8, "Too Long!")
        .required("Password Required"),
      confirm_password: Yup.string()
        .min(4, "Too Short!")
        .max(8, "Too Long!")
        .required("Password Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      registerApi(values).then((res) => {
        if (res.data.status == "0") {
          alert(res.data.message);
        } else {
          props.history.push("/login");
        }
      });
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h4 className="card-title text-center mb-2 fw-light fs-5">
                Register a new account
              </h4>
              <small className="text-center mb-5 text-muted">
                Have an account? <a href="/login">Login</a>
              </small>
              <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter Username"
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
                    placeholder="Enter Email"
                    autoComplete="off"
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
                    placeholder="Enter Phone Number"
                    autoComplete="off"
                    {...formik.getFieldProps("phone")}
                  />
                  <RiPhoneLine />
                </div>
                {formik.errors.phone && formik.touched.phone ? (
                  <small className="text-danger">{formik.errors.phone}</small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="Enater Password"
                    {...formik.getFieldProps("password")}
                  />
                  <RiLock2Line />
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="Confirm Password"
                    {...formik.getFieldProps("confirm_password")}
                  />
                  <RiRotateLockLine />
                </div>
                {formik.errors.confirm_password &&
                formik.touched.confirm_password ? (
                  <small className="text-danger">
                    {formik.errors.confirm_password}
                  </small>
                ) : null}

                <div className="d-grid mt-3">
                  <button
                    className="btn btn-primary rounded-pill input-block-level form-control"
                    type="submit"
                  >
                    Register
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
export default withRouter(Register);
