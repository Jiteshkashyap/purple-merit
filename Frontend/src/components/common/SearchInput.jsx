import { useState, useEffect } from "react";

export default function SearchInput({ value, onChange }) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(input);
    }, 400);  

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <input
      placeholder="Search users..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="border p-2 rounded w-60"
    />
  );
}