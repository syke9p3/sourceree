import express from 'express';
import { 
    getUsers, 
    getUserById, 
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';
import { validateToken } from '../middlewares/AuthMiddleware.js'

const router = express.Router();

router.get('/', validateToken, getUsers)
router.get('/:id', validateToken, getUserById)
router.put('/:id', validateToken, updateUser)
router.delete('/:id', validateToken, deleteUser)

export default router