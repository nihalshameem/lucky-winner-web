import React, { useEffect } from "react";
import { RiLock2Line, RiRotateLockLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassApi, profileApi } from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";
import { useSnackbar } from "react-simple-snackbar";
const success = {
  position: "bottom-left",
  style: {
    backgroundColor: "#007E33",
  },
};

const error = {
  position: "bottom-left",
  style: {
    backgroundColor: "#CC0000",
  },
};
function ChangePass(props) {
  const [loader, setLoader] = React.useState(false);
  const [openSuccess, closeSuccess] = useSnackbar(success);
  const [openError, closeError] = useSnackbar(error);

  useEffect(() => {
    checkStorage();
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
          openError("Something went wrong!");
        });
    } else {
      props.history.push("/login");
    }
  }
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
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
    onSubmit: (values, { setErrors }) => {
      setLoader(true);
      changePassApi(values)
        .then((res) => {
          if (res.data.status === "0") {
            setErrors(res.data);
            setLoader(false);
          } else {
            openSuccess(res.data.success);
            setLoader(false);
          }
        })
        .catch((e) => {
          openError("Something Wrong!");
        });
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
                Password Change
              </h4>
              <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="Enter Password"
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
                    disabled={loader}
                  >
                    Update
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
export default ChangePass;
