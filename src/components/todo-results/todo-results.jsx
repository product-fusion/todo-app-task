import * as React from 'react';
import './todo-results.scss';
import { TodosContext } from '../../todo-context';

export const TodoResults = () => {
  const { todos, setTodos } = React.useContext(TodosContext);

  const calculateChecked = () => {
     const todoData = todos.filter((data) => Boolean(data.checked));
     return todoData.length || 0;
  };

  return (
    <div className="todo-results">
      Done:
      {calculateChecked()}
    </div>
  );
};
