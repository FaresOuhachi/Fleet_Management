const auth = require("./authentication");
const authorizationMiddleware = (role) => {
  return (req, res, next) => {
    if (req.body.user.role >= role) {
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  };
};

module.exports = authorizationMiddleware;
