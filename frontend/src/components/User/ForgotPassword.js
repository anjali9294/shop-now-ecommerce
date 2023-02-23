import React from "react";

import { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import "./ForgotPassword.css";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
  };

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Change Password " />
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
                                onSubmit={forgotPasswordSubmit}
                              >
                                <div className="section text-center">
                                  <h4 className="mb-4 pb-3">Change Password</h4>

                                  <div className="form-group mt-2">
                                    <input
                                      type="email"
                                      className="form-style"
                                      placeholder="Your Email"
                                      required
                                      name="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <i className="input-icon fa fa-at"></i>
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

export default ForgotPassword;
