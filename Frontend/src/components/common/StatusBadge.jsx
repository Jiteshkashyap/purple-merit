export default function StatusBadge({ status }) {
  const isActive = status === true || status === "active";

  return (
    <span
      className={`px-2 py-1 rounded text-sm ${
        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}