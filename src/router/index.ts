import authentication from "./authentication.js";
import express from "express";

const router = express.Router()

export default (): express.Router => {
  authentication(router)
  return router;
}