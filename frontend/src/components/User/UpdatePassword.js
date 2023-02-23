import React from "react";

import { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import "./UpdatePassword.css";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Metadata from "../layout/Metadata";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      history.push("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, isUpdated, history]);

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
                                onSubmit={updatePasswordSubmit}
                              >
                                <div className="section text-center">
                                  <h4 className="mb-4 pb-3">Change Password</h4>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="password"
                                      className="form-style"
                                      placeholder="Old Password"
                                      // autoComplete="none"
                                      required
                                      value={oldPassword}
                                      onChange={(e) =>
                                        setOldPassword(e.target.value)
                                      }
                                    />
                                    <i className="input-icon fa fa-key"></i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="password"
                                      className="form-style"
                                      placeholder="New Password"
                                      // autoComplete="none"
                                      required
                                      value={newPassword}
                                      onChange={(e) =>
                                        setNewPassword(e.target.value)
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
                                    value="Change"
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

export default UpdatePassword;
