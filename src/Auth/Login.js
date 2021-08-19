import React, { useEffect } from "react";
import { RiUser3Line, RiLock2Line } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { loginApi, profileApi } from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";
import { useSnackbar } from "react-simple-snackbar";

const error = {
  position: "bottom-left",
  style: {
    backgroundColor: "#CC0000",
  },
};

function Login(props) {
  const [loader, setLoader] = React.useState(false);
  const [openError, closeError] = useSnackbar(error);

  useEffect(() => {
    function checkUserData() {
      const data = localStorage.getItem("api_token");
      if (data) {
        profileApi()
          .then((res) => {
            if (res.data.status !== "0") {
              props.history.push("/");
            }
          })
          .catch((e) => {
            openError("Something went wrong!");
          });
      }
    }
    checkUserData();
    window.addEventListener("storage", checkUserData);

    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      message: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username Required!"),
      password: Yup.string()
        .min(4, "Too Short!")
        .max(8, "Too Long!")
        .required("Password Required"),
    }),
    onSubmit: (values, { setErrors }) => {
      setLoader(true);
      loginApi(values).then((res) => {
        if (res.data.status === "0") {
          setErrors(res.data);
          setLoader(false);
        } else {
          let token = res.data.api_token;
          localStorage.setItem("api_token", token);
          window.location.reload();
        }
      });
    },
  });
  return (
    <div className="container">
      {loader && <LoaderMini />}
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h4 className="card-title text-center mb-2 fw-light fs-5">
                Login into your account
              </h4>
              <small className="text-center mb-5 text-muted">
                Don't have an account yet? <a href="/register">Signup</a>
              </small>
              <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="floatingInputEmail"
                    placeholder="Email / Phone Number"
                    autoComplete="off"
                    {...formik.getFieldProps("username")}
                  />
                  <RiUser3Line />
                </div>
                {formik.errors.username && formik.touched.username ? (
                  <small className="text-danger">
                    {formik.errors.username}
                  </small>
                ) : null}
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="floatingPassword"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  <RiLock2Line />
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
                {formik.errors.message && formik.touched.message ? (
                  <small className="text-danger">{formik.errors.message}</small>
                ) : null}

                <div className="d-grid mt-3">
                  <button
                    className="btn btn-primary rounded-pill input-block-level form-control"
                    type="submit"
                    disabled={loader}
                  >
                    Login
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
export default withRouter(Login);
