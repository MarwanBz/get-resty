import { get, merge } from 'lodash';

import express from 'express';
import { getUsersBySessionToken } from '../db/users.js';

export const isAuthenticated: express.RequestHandler = async (req, res, next) => {
    try {
        const sessionToken = req.cookies['MARWAN-AUTH'];
        
        if (!sessionToken) {
            res.sendStatus(403);
            return;
        }

        const existingUser = await getUsersBySessionToken(sessionToken);
        
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }

        merge(req, { identity: existingUser });
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
