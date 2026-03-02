import { Router } from 'express';
import * as userController from './users.controller.js';
import * as userValidator from './users.validator.js';
import { authorize } from '../../middleware/auth.middleware.js';

const router = Router();

router.use(authorize(['ADMIN']));

router.post('/', userValidator.createUserValidator, userController.createUser);
router.get('/', userValidator.paginationValidator, userController.getAllUser);
router.delete('/:id', userValidator.userIdValidator, userController.deleteUser);
router.patch('/:id/role', userValidator.userIdValidator, userController.updateUserRole);

export default router;