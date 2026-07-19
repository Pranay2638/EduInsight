// import jwt from "jsonwebtoken";
// import pool from "../config/db.js";

// const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET
//       );

//       const result = await pool.query(
//         `SELECT id,name,email
//          FROM users
//          WHERE id = $1`,
//         [decoded.id]
//       );

//       req.user = result.rows[0];

//       next();
//     } else {
//       return res.status(401).json({
//         message: "Not authorized"
//       });
//     }
//   } catch (error) {
//     console.error(error);

//     return res.status(401).json({
//       message: "Invalid token"
//     });
//   }
// };

// export default protect;

import jwt from "jsonwebtoken";
import pool from "../config/DB.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check for token presence and format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // 2. Extract and verify token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch user from PostgreSQL
    const result = await pool.query(
      `SELECT id, name, email FROM users WHERE id = $1`,
      [decoded.id]
    );

    // 4. Handle cases where the user was deleted but token is still valid
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // 5. Attach user to request and proceed
    req.user = result.rows[0];
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    
    // Handle expired tokens explicitly if needed, otherwise fallback to 401
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export default protect;