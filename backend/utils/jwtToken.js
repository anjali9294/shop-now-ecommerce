// creating token and saving in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKEIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    domain: "localhost",
    path: "/",
    secure: true,
  };
  const option = {
    domain: "https://ecommerce-api-g3mf.onrender.com",
  };

  res.status(statusCode).cookie("token", token, options, option).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
