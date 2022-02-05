const jwt = require("jsonwebtoken");

/**
 * If the request has a token, verify it using the secret key. If it's valid, set the user property of
 * the request object to the user associated with the token. If it's not valid, return a 403 error
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the chain.
 * @returns A json object with the user's information.
 */
function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Your not authenticated");
  }
}

module.exports = verify;
