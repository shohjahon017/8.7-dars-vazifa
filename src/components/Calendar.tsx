import React, { useState } from "react";
import Modal from "./Modal";
import Notes from "./Notes";

interface Event {
  date: string;
  title: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    setCurrentDate(nextMonth);
  };

  const handleAddEvent = (date: string) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleSaveEvent = (title: string) => {
    if (selectedDate) {
      setEvents([...events, { date: selectedDate, title }]);
      setShowModal(false);
    }
  };

  const days = [];
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const totalDays = daysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-sm font-bold text-center text-gray-500 dark:text-gray-400 uppercase tracking-wide"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-24 flex flex-col justify-end items-center rounded-lg border border-gray-200 dark:border-gray-700 p-2 ${
              day
                ? "bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                : "bg-transparent"
            }`}
            onClick={
              day
                ? () =>
                    handleAddEvent(
                      `${currentDate.getFullYear()}-${
                        currentDate.getMonth() + 1
                      }-${day}`
                    )
                : undefined
            }
          >
            <span
              className={`text-lg font-medium ${
                day ? "text-gray-800 dark:text-gray-200" : ""
              }`}
            >
              {day}
            </span>
            {day && (
              <Notes
                events={events}
                date={`${currentDate.getFullYear()}-${
                  currentDate.getMonth() + 1
                }-${day}`}
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition duration-200"
      >
        Add Event
      </button>
      {showModal && (
        <Modal onSave={handleSaveEvent} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Calendar;
