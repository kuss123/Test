import { Router } from 'express';
const router = Router();
import { registerController } from '../controllers/auth.controller.js';

router.post('/register', registerController);

export default router;
