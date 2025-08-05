import React, { useState } from "react"; // pode juntar os imports

const CounterButton = () => { // <-- Corrigido aqui
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Incrementar
      </button>
      <h1 className="text-2xl font-bold">{count}</h1>
      <button
        onClick={() => setCount(count - 1)}
        className="bg-red-500 text-white p-2 rounded"
      >
        Decrementar
      </button>
    </div>
  );
};

export default CounterButton;
