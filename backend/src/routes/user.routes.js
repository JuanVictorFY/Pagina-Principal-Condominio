import { Router } from 'express';
import { getAllUsers, deleteUser } from '../controllers/user.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta: GET /api/users (Protegida, solo ADMIN)
router.get('/', verifyToken, checkRole(['ADMIN']), getAllUsers);
router.delete('/:id', verifyToken, checkRole(['ADMIN']), deleteUser);

export default router;