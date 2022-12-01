import express from "express";

import http from "http";


import { connect } from "./utils/db.js";
import config from "./config.js";

import { register, login, protect, access_token } from "./utils/auth.js";
import userRouter from "./resources/users/users.router.js";
import questionRouter from './resources/question/question.router.js'
import quizRouter from './resources/quiz/quiz.router.js'
import morgan from "morgan";
import cors from "cors";
import logger from "./utils/logger.js";

const app = express();
//const server = http.createServer(app);

app.use(morgan("dev"));

// enable cors
app.use(cors());
app.options("*", cors());
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/access-token", access_token)


app.use("/v1/users", userRouter);
app.use("/v1/question", questionRouter);
app.use("/v1/quiz", quizRouter);



export const start = async() => {
    try {
        await connect();
        app.listen(config.PORT, () => {
            logger(`🚀 server running on http://localhost:${config.PORT}/`);
        });
    } catch (e) {
        console.error(e);
    }
};

start();