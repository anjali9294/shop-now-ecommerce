import React from "react";

import { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import "./UpdateProfile.css";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Metadata from "../layout/Metadata";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history.push("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, isUpdated, history, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Update Profile " />
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
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                              >
                                <div className="section text-center">
                                  <h4 className="mb-4 pb-3">Update Profile</h4>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-style"
                                      placeholder="Your Full Name"
                                      required
                                      name="name"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                    />
                                    <i className="input-icon fa fa-user"></i>
                                  </div>
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

                                  <div
                                    className="form-group mt-2 "
                                    id="registerImage"
                                  >
                                    <img
                                      src={avatarPreview}
                                      alt="avatar preview"
                                    />
                                    <input
                                      className="form-style"
                                      type="file"
                                      name="avatar"
                                      accept="image/*"
                                      onChange={updateProfileDataChange}
                                    />
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

export default UpdateProfile;
