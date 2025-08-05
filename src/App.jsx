// App.jsx
import TodoApp from './components/TodoApp';
import CounterButton from './components/CounterButton';

function App() {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen p-4 flex flex-col items-center gap-8">
      <TodoApp />
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2 text-center">Contador</h2>
        <CounterButton />
      </div>
    </div>
  );
}

export default App;