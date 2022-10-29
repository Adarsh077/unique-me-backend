import { Router } from 'express';

import { todoController } from '../controllers';

const router = Router();

router
  .route('/')
  .post(todoController.createTodo);

export default router;
