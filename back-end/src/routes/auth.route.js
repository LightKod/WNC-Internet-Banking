import express from 'express';
import {
    loginController,
    registerController,
    refreshTokenController
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/refresh-token', refreshTokenController);

export default router;
