import express from 'express';
import { deleteUserById, getUserById, getUsers, updateUserById, getUsersByEmail } from '../db/users.js';

// Get all users
export const getAllUsers = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

// Get user by ID
export const getUserByIdController = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

// Delete user
export const deleteUser = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

// Update user
export const updateUser = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            res.sendStatus(400);
            return;
        }

        const user = await updateUserById(id, { username });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
