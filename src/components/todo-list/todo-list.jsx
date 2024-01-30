import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import IndexedDB from '../../function/indexDB.function';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);

  const handleDelete = async (id) => {
    try {
      const db = await IndexedDB?.openDB();
      const transaction = db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
      const request = store.delete(id);
      request.onsuccess = async () => {
        const updatedTodos = await IndexedDB?.getAllTasksFromDB(db);
        setTodos(updatedTodos);
      };
      request.onerror = () => {
        console.error('Error deleting task from IndexedDB:', request.error);
      };
    } catch (error) {
      console.error('Error opening IndexedDB:', error);
    }
  };

  const toggleCheck = async (id) => {
    try {
      const db = await IndexedDB?.openDB();
      const transaction = db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
      const request = store.get(id);
      request.onsuccess = () => {
        const task = request.result;
        if (task) {
          task.checked = !task.checked;
          const updateRequest = store.put(task);
          updateRequest.onsuccess = async () => {
            const updatedTodos = await IndexedDB?.getAllTasksFromDB(db);
            console.log('Checked', updatedTodos);
            setTodos(updatedTodos);
          };
          updateRequest.onerror = () => {
            console.error('Error updating task in IndexedDB:', updateRequest.error);
          };
        }
      };
      request.onerror = () => {
        console.error('Error retrieving task from IndexedDB:', request.error);
      };
    } catch (error) {
      console.error('Error opening IndexedDB:', error);
    }
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {todos.length ? (
        <div className="todo-list-content">
          {todos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.task}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">Looks like you&apos;re absolutely free today!</div>
      )}
    </div>
  );
};
