class IndexedDB {
    static openDB() {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('TodoDB', 1);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    static addTaskToDB(db, newTask) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['tasks'], 'readwrite');
        const store = transaction.objectStore('tasks');
        const request = store.add({ task: newTask });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    static getAllTasksFromDB(db) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['tasks'], 'readonly');
        const store = transaction.objectStore('tasks');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
}
export default IndexedDB;