import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import CalendarCard from "./CalendarCard";

export default function TodoApp() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [futureTasks, setFutureTasks] = useState([]);

    useEffect(() => {
        const savedFuture = localStorage.getItem("futureTasks");
        if (savedFuture) {
            setFutureTasks(JSON.parse(savedFuture));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("futureTasks", JSON.stringify(futureTasks));
    }, [futureTasks]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask() {
        if (!input.trim()) return;
        setTasks([...tasks, { text: input.trim(), done: false }]);
        setInput("");
    }

    function addFutureTask(task) {
        setFutureTasks([...futureTasks, { ...task, done: false }]);
    }

    function toggleTask(index) {
        const newTasks = [...tasks];
        newTasks[index].done = !newTasks[index].done;
        setTasks(newTasks);
    }

    function toggleFutureTask(index) {
        const updated = [...futureTasks];
        updated[index].done = !updated[index].done;
        setFutureTasks(updated);
    }

    function removeTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function removeFutureTask(index) {
        setFutureTasks(futureTasks.filter((_, i) => i !== index));
    }

    function clearTasks() {
        setTasks([]);
    }

    function clearFutureTasks() {
        setFutureTasks([]);
    }

    function editTask(index, newText) {
        const newTasks = [...tasks];
        newTasks[index].text = newText;
        setTasks(newTasks);
    }

    return (
        <div className="min-h-screen px-4 py-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto p-6 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-transparent"
            >
                <div className="flex justify-end mb-2">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                    >
                        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
                    </button>
                </div>

                <h1 className="text-2xl font-bold mb-4 text-center">To Do List</h1>

                <div className="flex mb-4">
                    <input
                        type="text"
                        className="flex-1 p-2 rounded-l bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                        placeholder="Nova tarefa..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 px-4 py-2 rounded-r hover:bg-green-600 transition"
                        onClick={addTask}
                    >
                        Adicionar
                    </motion.button>
                </div>

                <h3 className="fixed bottom-2 left-3 text-black dark:text-white text-sm opacity-70 z-50">
                    @ Pedro Paiva 2025
                </h3>

                <ul className="space-y-2">
                    <AnimatePresence>
                        {tasks.map((task, index) => (
                            <motion.li
                                key={task.text + index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
                            >
                                <span
                                    className={`flex-1 text-sm ${task.done ? "line-through text-gray-400" : "text-gray-900 dark:text-white"}`}
                                    onClick={() => toggleTask(index)}
                                >
                                    {task.text}
                                </span>
                                <button
                                    className="bg-dark-500 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded transition"
                                    onClick={() => removeTask(index)}
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </button>

                                <div className="flex gap-2 ml-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition"
                                        onClick={() => {
                                            const newText = prompt("Editar tarefa:", task.text);
                                            if (newText !== null && newText.trim() !== "") {
                                                editTask(index, newText.trim());
                                            }
                                        }}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={clearTasks}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition"
                    >
                        Limpar todas as tarefas
                    </button>
                </div>

                <CalendarCard addFutureTask={addFutureTask} />

                {futureTasks.length > 0 && (
                    <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Tarefas Futuras</h2>
                            <button
                                onClick={clearFutureTasks}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Limpar todas
                            </button>
                        </div>
                        <ul className="space-y-2">
                            {futureTasks.map((task, index) => (
                                <li key={index} className="flex justify-between items-center p-2 bg-gray-900 rounded shadow text-white">
                                    <span
                                        className={`flex-1 cursor-pointer ${task.done ? "line-through text-gray-400" : ""}`}
                                        onClick={() => toggleFutureTask(index)}
                                    >
                                        {task.text}
                                    </span>
                                    <span className="text-sm text-gray-400 mr-4">
                                        {new Date(task.date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                                    </span>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                        onClick={() => removeFutureTask(index)}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
