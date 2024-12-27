import { get, merge } from 'lodash';

import express from 'express';
import { getUserBySessionToken } from '../db/users.js';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction)  => {
    try {
        const sessionToken = req.cookies['MARWAN-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
