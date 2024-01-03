const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    user,
    token,
  });
};

module.exports = sendToken;


//This code sets a cookie named "token" in the client's browser, containing the JWT (JSON Web Token) generated for 
//the authenticated user. The cookie is configured with an expiration date and the HTTP-only flag for security. 
//This cookie will be sent with each subsequent HTTP request to the server