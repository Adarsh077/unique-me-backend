interface Todo {
  userId: String;
  title: String;
  description?: String;
}

export interface CreateTodo extends Todo { };

export default Todo;