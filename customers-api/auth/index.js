import jwt from "jsonwebtoken";
import { INVALID_TOKEN, UNAUTHORIZED } from "../enums/http-status.enum.js";

const JWT_SECRET = process.env.JWT_SECRET || "secreto";
const SERVICE_TOKEN = process.env.SERVICE_TOKEN || "token";

// Generate JWT
const generateJWT = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "12h" }
  );

// Validate JWT
const validateJWT = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Middleware: JWT Authentication
export const authJWT = (req, res, next) => {
  existsJWT(req, res);

  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];

  isValidToken(authorization, res);

  const decoded = validateJWT(token);

  if (!decoded)
    return res.status(FORBIDDEN).json({
      error: "Forbidden",
    });

  req.auth = decoded;
  next();
};

// Middleware: B2B Authentication
export const authenticateService = (req, res, next) => {
  existsJWT(req, res);

  const authorization = req.headers.authorization;

  isValidToken(authorization, res);
};

const existsJWT = (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({
      error: "Not authorized",
    });
  }
};

const isValidToken = (authorization, res) => {
  const token = authorization.split(" ")[1];

  if (token === SERVICE_TOKEN) {
    return res.status(INVALID_TOKEN).json({
      error: "Invalid token",
    });
  }
};

export default {
  generateJWT,
  validateJWT,
};
