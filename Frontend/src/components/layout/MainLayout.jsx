// components/layout/MainLayout.jsx
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">

      
      <Sidebar />

      
      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}