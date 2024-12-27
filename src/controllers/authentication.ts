import { authentication, random } from "../helpers/index.js";
import { createUser, getUsersByEmail } from "../db/users.js";

import express from "express";

// login controller
export const login = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await getUsersByEmail(email).select('+authentication.salt +authentication.password');
    if (!user) {
      res.sendStatus(400);
      return;
    }
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      res.sendStatus(403);
      return;
    }
    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    
    await user.save();
    res.cookie('MARWAN-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/', });
    
    res.status(200).json(user);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
// !end of login controller

//register controller 
export const register = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.sendStatus(400);
      return;
    }

    const existingUser = await getUsersByEmail(email);
    if (existingUser) {
      res.sendStatus(400);
      return;
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
// end of register controller