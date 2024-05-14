// App.tsx (ou tout autre composant parent)
import React from 'react';
import ToDoManager from './ui/screen/ToDoManager';

const App: React.FC = () => {
  return (
    <div className="App">
      <ToDoManager />
    </div>
  );
};

export default App;
