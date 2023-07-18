const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  const authorizeToken = token.split(" ")[1];

  if (authorizeToken) {
    jwt.verify(authorizeToken, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return res.status(500).json("You are not authorized....");
      } else {
        req.user = user;

        next();
      }
    });
  } else {
    return res.status(403).json("You are not authorized");
  }
};

const verifyTokenAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(500).json("You are not authorized");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(500).json("You are not authorize");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorize, verifyAdmin };
