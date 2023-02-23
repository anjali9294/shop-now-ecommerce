import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import "./LoginSignUp.css";
import { useAlert } from "react-alert";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
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
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [
    dispatch,
    error,
    alert,
    isAuthenticated,
    history,
    loginEmail,
    loginPassword,
    redirect,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="body">
            <div className="section">
              <div className="container">
                <div className="row full-height justify-content-center">
                  <div className="col-12 text-center align-self-center py-5">
                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                      <h6 className="mb-0 pb-3">
                        <span>Log In </span>
                        <span>Sign Up</span>
                      </h6>
                      <input
                        className="checkbox"
                        type="checkbox"
                        id="reg-log"
                        name="reg-log"
                      />
                      <label htmlFor="reg-log" ref={switcherTab}></label>
                      <div className="card-3d-wrap mx-auto">
                        <div className="card-3d-wrapper">
                          <div className="card-front">
                            <div className="center-wrap">
                              <form
                                className="loginForm"
                                ref={loginTab}
                                onSubmit={loginSubmit}
                              >
                                <div className="section text-center">
                                  <h4 className="mb-4 pb-3">Log In</h4>
                                  <div className="form-group">
                                    <input
                                      type="email"
                                      className="form-style"
                                      placeholder="Your Email"
                                      // autoComplete="none"
                                      name="email"
                                      required
                                      value={loginEmail}
                                      onChange={(e) =>
                                        setLoginEmail(e.target.value)
                                      }
                                    />
                                    <i className="input-icon fa fa-at"></i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="password"
                                      className="form-style"
                                      placeholder="Your Password"
                                      // autoComplete="none"
                                      required
                                      value={loginPassword}
                                      onChange={(e) =>
                                        setLoginPassword(e.target.value)
                                      }
                                    />
                                    <i className="input-icon fa fa-lock"></i>
                                  </div>

                                  <input
                                    type="submit"
                                    value="Login"
                                    className="btn mt-4"
                                  />

                                  <p className="mb-0 mt-4 text-center">
                                    <Link
                                      to="/password/forgot"
                                      className="link"
                                    >
                                      Forget Password ?
                                    </Link>
                                  </p>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="card-back">
                            <div className="center-wrap">
                              <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                              >
                                <div className="section text-center">
                                  <h4 className="mb-4 pb-3">Sign Up</h4>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-style"
                                      placeholder="Your Full Name"
                                      required
                                      name="name"
                                      value={name}
                                      onChange={registerDataChange}
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
                                      onChange={registerDataChange}
                                    />
                                    <i className="input-icon fa fa-at"></i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      className="form-style"
                                      placeholder="Your Password"
                                      required
                                      name="password"
                                      value={password}
                                      onChange={registerDataChange}
                                    />
                                    <i className="input-icon fa fa-lock"></i>
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
                                      onChange={registerDataChange}
                                    />
                                  </div>
                                  <input
                                    type="submit"
                                    value="Register"
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

export default LoginSignUp;
