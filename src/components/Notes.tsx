import React from "react";

interface NotesProps {
  events: { date: string; title: string }[];
  date: string;
}

const Notes: React.FC<NotesProps> = ({ events, date }) => {
  const notes = events.filter((event) => event.date === date);

  return (
    <div className="space-y-1">
      {notes.slice(0, 3).map((note, index) => (
        <div
          key={index}
          className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded px-2 py-1"
        >
          {note.title}
        </div>
      ))}
    </div>
  );
};

export default Notes;
