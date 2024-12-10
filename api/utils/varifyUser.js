// import jwt from "jsonwebtoken";
// import { throwError } from "./error.js";

// export const verifyToken = (req, res, next) => {
//   const tooken = req.cookies.access_token;
//   if (!tooken) return next(throwError(401, "Session End. Login Again! "));
//   jwt.verify(tooken, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(throwError(403, "Frbidden"));
//     req.user = user;
//     next();
//   });
// };
// utils/verifyUser.js
import jwt from "jsonwebtoken";
import { throwError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(throwError(401, "Session End. Login Again! "));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(throwError(403, "Forbidden"));
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return next(throwError(403, "Admin access required" ));
    }
  });
};
