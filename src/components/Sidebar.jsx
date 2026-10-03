import {
  House,
  LayoutPanelTop,
  BookAudio,
  BookOpen,
  Settings,
  University 
} from "lucide-react";

function Sidebar() {
  return (
    <section className="bg-blue-900 h-screen w-1/6 flex flex-col items-center ml-0 gap-4">
     <span className="text-white font-bold text-2xl mt-8 flex items-center justify-center gap-6"> <University/><h1 className="text-white font-bold text-xl">Campus Seat <br/>Finder</h1></span>
      <ul className="flex flex-col gap-4 mt-8">

        <li className="text-white font-bold flex gap-4 hover:bg-blue-700 p-2 rounded-md"><House /> Dashboard</li>

        <li className="text-white font-bold flex gap-4 hover:bg-blue-700 p-2 rounded-md"><LayoutPanelTop /> Seat Layout</li>

        <li className="text-white font-bold flex gap-4 hover:bg-blue-700 p-2 rounded-md">
          <BookAudio /> My Booking
        </li>

        <li className="text-white font-bold flex gap-4 hover:bg-blue-700 p-2 rounded-md">
          <BookOpen /> All Bookings
        </li>

        <li className="text-white font-bold flex gap-4 hover:bg-blue-700 p-2 rounded-md">
          <Settings /> Settings
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;