import { Request, Response } from 'express';
import { todoService } from '../services';
import { catchAsync } from '../utils';

export const createTodo = catchAsync(async (req: Request, res: Response) => {
  const { userId, title, description } = req.body;

  const { todo } = await todoService.createTodos({
    userId,
    title,
    description,
  });

  res.send({
    status: 'success',
    body: todo,
  });
});
