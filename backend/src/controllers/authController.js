import bcrypt from "bcryptjs";
import pool from "../config/DB.js";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const result = await pool.query(
      `INSERT INTO users
      (name,email,password)
      VALUES ($1,$2,$3)
      RETURNING id,name,email`,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    const token = generateToken(user.id);

    res.status(201).json({
      user,
      message: "user registered successfully",
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: "user logged in successfully" ,
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};

export const getCurrentUser = async (
  req,
  res
) => {
  res.json(req.user);
};

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    // Verify Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        message: "Invalid Google token",
      });
    }

    const {
      email,
      name,
      sub: googleId,
    } = payload;

    // Find existing user by email
    let result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    let user;

    if (result.rows.length > 0) {

      user = result.rows[0];

      /*
       * Existing local account?
       * Link it with Google.
       */
      if (
        user.provider === "local" &&
        !user.google_id
      ) {

        const updatedUser =
          await pool.query(
            `
            UPDATE users
            SET
              // provider = 'google',
              google_id = $1
            WHERE id = $2
            RETURNING *
            `,
            [
              googleId,
              user.id,
            ]
          );

        user = updatedUser.rows[0];
      }

    } else {

      // First Google login → Create account

      const newUser =
        await pool.query(
          `
          INSERT INTO users
          (
            name,
            email,
            password,
            provider,
            google_id
          )

          VALUES
          (
            $1,
            $2,
            NULL,
            'google',
            $3
          )

          RETURNING *
          `,
          [
            name,
            email,
            googleId,
          ]
        );

      user = newUser.rows[0];
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Google authentication failed",
    });

  }
};