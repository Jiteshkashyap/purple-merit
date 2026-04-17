export default function FilterDropdown({ options, onChange }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}