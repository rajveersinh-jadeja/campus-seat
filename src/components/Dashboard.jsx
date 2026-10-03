import { useEffect, useState } from "react";
import {
  Armchair,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Monitor,
  User,
  Users,
  X,
} from "lucide-react";

function Dashboard() {
  const [seats, setSeats] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/seats")
      .then((res) => res.json())
      .then((data) => {
        setSeats(data);
        setSelectedSeat(data.find((seat) => seat.seatId === "A4"));
      })
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error(error));
  }, []);

  const totalSeats = seats.length;

  const availableSeats = seats.filter(
    (seat) => seat.status === "available"
  ).length;

  const occupiedSeats = seats.filter(
    (seat) => seat.status === "occupied"
  ).length;

  const reservedSeats = seats.filter(
    (seat) => seat.status === "reserved"
  ).length;

  const todaysBookings = bookings.filter(
    (booking) => booking.date === "2026-10-03"
  ).length;

  const selectedBooking = selectedSeat
    ? bookings.find(
        (booking) =>
          booking.seatId === selectedSeat.seatId &&
          booking.status === "active"
      )
    : null;

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#f5f8fc] p-5">
      <header className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#17233c]">
            Welcome, Student!
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Find and book available seats in your campus library or lab.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-xs flex items-center gap-2 shadow-sm">
            <Building2 size={15} />
            Main Library
          </button>

          <button className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-xs flex items-center gap-2 shadow-sm">
            <CalendarDays size={15} />
            03 Oct 2026
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
              S
            </div>

            <span className="text-xs font-medium text-gray-700">
              Student
            </span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-5 gap-3 mb-5">
        <StatCard
          icon={<Armchair size={21} />}
          title="Total Seats"
          value={totalSeats}
          subtitle="Across 4 rows"
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          icon={<CheckCircle2 size={21} />}
          title="Available"
          value={availableSeats}
          subtitle="Seats free now"
          color="bg-green-100 text-green-600"
        />

        <StatCard
          icon={<Users size={21} />}
          title="Occupied"
          value={occupiedSeats}
          subtitle="Currently in use"
          color="bg-red-100 text-red-600"
        />

        <StatCard
          icon={<Clock3 size={21} />}
          title="Reserved"
          value={reservedSeats}
          subtitle="Pre-booked"
          color="bg-yellow-100 text-yellow-600"
        />

        <StatCard
          icon={<CalendarDays size={21} />}
          title="Today's Bookings"
          value={todaysBookings}
          subtitle="Total bookings"
          color="bg-purple-100 text-purple-600"
        />
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)_270px] gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#17233c]">
              Seat Layout - Main Library
            </h2>

            <div className="flex items-center gap-4 text-[11px]">
              <Legend color="bg-green-400" text="Available" />
              <Legend color="bg-red-400" text="Occupied" />
              <Legend color="bg-yellow-400" text="Reserved" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All ({totalSeats})
            </FilterButton>

            <FilterButton
              active={filter === "available"}
              onClick={() => setFilter("available")}
            >
              Available ({availableSeats})
            </FilterButton>

            <FilterButton
              active={filter === "occupied"}
              onClick={() => setFilter("occupied")}
            >
              Occupied ({occupiedSeats})
            </FilterButton>

            <FilterButton
              active={filter === "reserved"}
              onClick={() => setFilter("reserved")}
            >
              Reserved ({reservedSeats})
            </FilterButton>
          </div>

          <div className="grid grid-cols-[28px_repeat(10,minmax(0,1fr))] gap-2">
            <div />

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <div
                key={number}
                className="text-center text-[10px] font-medium text-gray-500"
              >
                {number}
              </div>
            ))}

            {["A", "B", "C", "D"].map((row) => (
              <div key={row} className="contents">
                <div className="flex items-center justify-center text-xs font-bold text-gray-500">
                  {row}
                </div>

                {seats
                  .filter((seat) => seat.row === row)
                  .map((seat) => {
                    const visible =
                      filter === "all" || seat.status === filter;

                    return (
                      <button
                        key={seat.id}
                        onClick={() => setSelectedSeat(seat)}
                        className={`h-9 rounded-md flex items-center justify-center text-xs font-semibold transition ${
                          visible
                            ? getSeatStyle(seat.status)
                            : "bg-gray-100 text-gray-300 opacity-40"
                        } ${
                          selectedSeat?.id === seat.id
                            ? "ring-2 ring-blue-500 ring-offset-1"
                            : ""
                        }`}
                      >
                        {seat.seatId}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>

        <SeatDetails
          seat={selectedSeat}
          booking={selectedBooking}
          onClose={() => setSelectedSeat(null)}
        />
      </section>
    </main>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-[11px] text-gray-500">{title}</p>
        <h2 className="text-xl font-bold text-[#17233c]">{value}</h2>
        <p className="text-[10px] text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

function Legend({ color, text }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-gray-500">{text}</span>
    </span>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-[11px] font-medium border ${
        active
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function getSeatStyle(status) {
  if (status === "available") {
    return "bg-green-100 text-green-700 hover:bg-green-200";
  }

  if (status === "occupied") {
    return "bg-red-100 text-red-600 hover:bg-red-200";
  }

  return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
}

function SeatDetails({ seat, booking, onClose }) {
  if (!seat) {
    return (
      <aside className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[#17233c]">Seat Details</h2>

          <button onClick={onClose}>
            <X size={17} className="text-gray-400" />
          </button>
        </div>

        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-gray-400">
            Select a seat to view details
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-[#17233c]">Seat Details</h2>

        <button onClick={onClose}>
          <X size={17} className="text-gray-400" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#17233c]">
          {seat.seatId}
        </h3>

        <span
          className={`px-3 py-1 rounded-md text-[11px] font-semibold capitalize ${
            seat.status === "available"
              ? "bg-green-100 text-green-700"
              : seat.status === "occupied"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {seat.status}
        </span>
      </div>

      <Detail
        icon={<MapPin size={16} />}
        title="Location"
        value={`Main Library - Row ${seat.row}`}
      />

      <Detail
        icon={<Monitor size={16} />}
        title="Seat Type"
        value={`${seat.type} Seat`}
      />

      {booking && (
        <>
          <Detail
            icon={<User size={16} />}
            title="Reserved By"
            value={`${booking.studentName} (${booking.rollNo})`}
          />

          <Detail
            icon={<CalendarDays size={16} />}
            title="From"
            value={`${formatDate(booking.date)} ${booking.startTime}`}
          />

          <Detail
            icon={<CalendarDays size={16} />}
            title="To"
            value={`${formatDate(booking.date)} ${booking.endTime}`}
          />
        </>
      )}

      {seat.status === "available" && !booking && (
        <button className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md text-xs font-semibold">
          Book This Seat
        </button>
      )}

      {seat.status === "occupied" && (
        <button
          disabled
          className="w-full mt-5 bg-gray-200 text-gray-500 py-2.5 rounded-md text-xs font-semibold"
        >
          Currently Occupied
        </button>
      )}

      {seat.status === "reserved" && (
        <button
          disabled
          className="w-full mt-5 bg-gray-200 text-gray-500 py-2.5 rounded-md text-xs font-semibold"
        >
          Seat is Reserved
        </button>
      )}
    </aside>
  );
}

function Detail({ icon, title, value }) {
  return (
    <div className="flex gap-3 mb-5">
      <div className="text-gray-400 mt-0.5">{icon}</div>

      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 mb-0.5">{title}</p>

        <p className="text-xs font-medium text-gray-700 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

function formatDate(date) {
  const [year, month, day] = date.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[Number(month) - 1]} ${year}`;
}

export default Dashboard;













