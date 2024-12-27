import { deleteUser, getAllUsers, getUserByIdController, updateUser } from '../controllers/users.js';

import express from 'express';

// import { isAuthenticated } from '../middlewares/index.js';

export default (router: express.Router): void => {
    // Get all users (protected route)
    router.get('/users', (req: express.Request, res: express.Response) => {
        getAllUsers(req, res);
    });
    
    // Get user by ID (protected route)
    router.get('/users/:id', (req: express.Request, res: express.Response) => {
        getUserByIdController(req, res);
    });
    
    // Delete user (protected route)
    router.delete('/users/:id', (req: express.Request, res: express.Response) => {
        deleteUser(req, res);
    });
    
    // Update user (protected route)
    router.patch('/users/:id', (req: express.Request, res: express.Response) => {
        updateUser(req, res);
    });
};