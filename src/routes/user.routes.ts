import { Router } from 'express';
import { createNewUser, getLoginToken } from '../controllers/user.controller';

const router = Router();

router.post('/', createNewUser);
router.post('/auth', getLoginToken);

export default router;
