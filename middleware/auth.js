import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided!" });
  }

  const token = authHeader.split(" ")[1];

  const verified = jwt.verify(token, secret);
  req.payload = verified;
  console.log(req.payload);
  if (req.payload.role === "user") {
    next();
  } else {
    return res.status(403).json({ error: "access denied" });
  }
};
export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided!" });
  }

  const token = authHeader.split(" ")[1];

  const verified = jwt.verify(token, secret);
  req.payload = verified;
  console.log(req.payload);
  if (req.payload.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "access denied" });
  }
};
export const createToken = (id, role) => {
  const token = jwt.sign({ id, role }, secret, { expiresIn: "1h" });

  return token;
};
