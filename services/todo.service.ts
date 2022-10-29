import { CreateTodo } from '../interfaces/todo.interface';

class TodoService {
  async getTodos(filter: object) {}

  async createTodos(data: CreateTodo) {
    return { todo: { userId: 'as', title: 'as', description: 'as' } };
  }
}

export default new TodoService();
