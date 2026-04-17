import { useSelector } from "react-redux";

export default function Loader() {
  const loading = useSelector((s) => s.ui.loading);
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}