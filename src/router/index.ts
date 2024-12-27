import authentication from "./authentication.js";
import express from "express";
import users from "./users.js";
const router = express.Router()

export default (): express.Router => {
  
  authentication(router)
  users(router)
  return router;
}