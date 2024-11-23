import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  date: string;
  title: string;
}

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState("");

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const firstDay = new Date(year, month, 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    for (let i = 0; i < firstDay; i++) {
      daysArray.unshift(0);
    }
    return daysArray;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleAddEvent = () => {
    if (selectedDate && eventTitle) {
      setEvents([...events, { date: selectedDate, title: eventTitle }]);
      setSelectedDate(null);
      setEventTitle("");
    }
  };

  const days = generateCalendar();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex items-center justify-between w-full max-w-lg mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          Oldingi
        </button>
        <h1 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h1>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          Keyingi
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2 w-full max-w-lg">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-bold text-gray-700 bg-gray-200 p-2 rounded-lg"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 w-full max-w-lg">
        {days.map((day, index) =>
          day === 0 ? (
            <div key={index} className="p-2"></div>
          ) : (
            <div
              key={index}
              onClick={() =>
                setSelectedDate(
                  `${day}-${
                    currentDate.getMonth() + 1
                  }-${currentDate.getFullYear()}`
                )
              }
              className="flex flex-col items-center justify-center h-16 text-center text-gray-700 bg-white border rounded-lg shadow hover:bg-blue-100 cursor-pointer"
            >
              <span>{day}</span>
              <div className="mt-1 text-xs text-gray-500">
                {events
                  .filter(
                    (event) =>
                      event.date ===
                      `${day}-${
                        currentDate.getMonth() + 1
                      }-${currentDate.getFullYear()}`
                  )
                  .map((event, idx) => (
                    <p key={idx}>{event.title}</p>
                  ))}
              </div>
            </div>
          )
        )}
      </div>

      {selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <p className="mb-4">Date: {selectedDate}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedDate(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
