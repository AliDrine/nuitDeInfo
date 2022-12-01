import dotenv from "dotenv";

dotenv.config();

const config =  {}

config.PORT = 5000;


config.SECRET = {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  }

config.dbUrl = 'mongodb+srv://quiz:quiz@cluster0.vye3qxn.mongodb.net/?retryWrites=true&w=majority'


export default config;