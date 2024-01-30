import * as React from 'react';
import { TodosContext } from '../../todo-context';
import IndexedDB from '../../function/indexDB.function';
import './todo-form.scss';

export const TodoForm = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');

  const handleAddTodo = async () => {
    if (!task.trim()) { return; }
    try {
      const db = await IndexedDB?.openDB();
      await IndexedDB?.addTaskToDB(db, task);
      const updatedTodos = await IndexedDB?.getAllTasksFromDB(db);
      setTodos(updatedTodos);
      setTask('');
    } catch (error) {
      console.error('Error adding task to IndexedDB:', error);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
