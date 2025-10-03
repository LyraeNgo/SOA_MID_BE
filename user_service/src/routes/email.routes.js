import express from 'express';
import { emailGenerate } from '../controllers/email.controller.js';

const router = express.Router();


router.post('/generate', emailGenerate);



export default router;
