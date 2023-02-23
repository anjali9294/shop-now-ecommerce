import React from "react";

import { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import "./UpdatePassword.css";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Updated Successfully");

      history.push("/login");
    }
  }, [dispatch, error, alert, success, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Reset Password " />
          <div className="body">
            <div className="section">
              <div className="container">
                <div className="row full-height justify-content-center">
                  <div className="col-12 text-center align-self-center py-5">
                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                      <div className="card-3d-wrap mx-auto">
                        <div className="card-3d-wrapper">
                          <div className="card-front">
                            <div className="center-wrap">
                              <form
                                className="signUpForm"
                                onSubmit={resetPasswordSubmit}
                              >
                                <div className="section text-center">
                                  <h4 className="mb-4 pb-3">Reset Password</h4>

                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="password"
                                      className="form-style"
                                      placeholder="New Password"
                                      // autoComplete="none"
                                      required
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                    />
                                    <i className="input-icon fa fa-unlock-alt"></i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="password"
                                      className="form-style"
                                      placeholder="Confirm Password"
                                      // autoComplete="none"
                                      required
                                      value={confirmPassword}
                                      onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                      }
                                    />
                                    <i className="input-icon fa fa-lock"></i>
                                  </div>
                                  <input
                                    type="submit"
                                    value="Update"
                                    className="btn mt-4"
                                    // disabled={loading ? true : false}
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
