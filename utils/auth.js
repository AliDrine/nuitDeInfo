import config from "../config.js";
import { User } from "../resources/users/users.model.js";
import jwt from "jsonwebtoken";

export const newToken = (user) => {
  const token = jwt.sign({ id: user.id }, config.SECRET.jwt, {
    expiresIn: config.SECRET.jwtExp,
  });

  return token;
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRET.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ status: 0, message: "need email and password" });
  }

  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email")
      .exec();

    if (user) {
      res
        .status(401)
        .send({ status: 0, message: "user already exist ! " })
        .end();
    }

    const newuser = await User.create(req.body);

    const token = newToken(newuser);

    return res.status(201).send({ status: 1, token });
  } catch (e) {
    return res.status(500).end();
  }
};

export const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ status: 0, message: "need credentials email and password" });
  }

  const invalid = {
    status: 0,
    message: "Invalid email and password combination",
  };

  try {
    const user = await User.findOne({ email: req.body.email })
      //.select('email password')
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res
      .status(201)
      .send({ status: 1, user, tokens: { access: { token } } });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ status: 0, message: "Authorization required !" })
      .end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

export const access_token = async (req, res) => {
  const { access_token } = req.body;
  const payload = await verifyToken(access_token);
  console.log('payload',payload)
  const user = await User.findById(payload.id);
  console.log('user',user)
  const token = newToken(user);
  if (!user) {
    res.send(404).end();
  }
  res.send({ status: 1, user, tokens: { access: { token } } });
};
