import { login, register } from '../controllers/authentication.js';

import express from 'express'

export default (router: express.Router): void => {
  router.post("/auth/register", (req, res) => register(req, res));
  router.post("/auth/login", (req, res) => login(req, res));
}