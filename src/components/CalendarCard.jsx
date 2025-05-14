import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarCard = ({ addFutureTask }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [taskText, setTaskText] = useState("");

    const handleAddTask = () => {
        if (taskText.trim() !== "" && selectedDate) {
            addFutureTask({ text: taskText.trim(), date: selectedDate });
            setTaskText("");
            setSelectedDate(null);
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl mt-4 text-white">
            <h2 className="text-lg font-bold mb-4">Adicionar tarefa futura</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="flex-1 p-2 rounded bg-gray-700 text-white"
                    placeholder="Descrição da tarefa..."
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />

                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    customInput={
                        <button
                            className="bg-white p-2 rounded-full hover:scale-105 transition flex items-center justify-center"
                            title="Selecionar data e hora"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Horário"
                    dateFormat="dd/MM/yyyy HH:mm"
                />
            </div>

            <button
                onClick={handleAddTask}
                className="bg-green-500 hover:bg-green-600 w-full p-2 rounded"
            >
                Adicionar tarefa com data
            </button>
        </div>
    );
};

export default CalendarCard;
