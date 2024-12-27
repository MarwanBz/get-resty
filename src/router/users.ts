import { deleteUser, getAllUsers, getUserByIdController, updateUser } from '../controllers/users.js';

import express from 'express';
import { isAuthenticated } from '../middlewares/index.js';

export default (router: express.Router): void => {
    // Get all users (protected route)
    router.get('/users', isAuthenticated, (req, res) => getAllUsers(req, res));
    
    // Get user by ID (protected route)
    router.get('/users/:id', isAuthenticated, (req, res) => getUserByIdController(req, res));
    
    // Delete user (protected route)
    router.delete('/users/:id', isAuthenticated, (req, res) => deleteUser(req, res));
    
    // Update user (protected route)
    router.patch('/users/:id', isAuthenticated, (req, res) => updateUser(req, res));
};