import { NavLink } from "react-router";
import { useUser } from "../features/authentication/useUser.js";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";
import Button from "../ui/button/Button.jsx";

function Bookings() {
  const { hasPermission } = useUser();

  if (!hasPermission("manage-bookings")) {
    return <div>You do not have permission to manage bookings.</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-4">
        <h1 className="text-3xl mb-4 font-semibold">All bookings</h1>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="md" as={NavLink} to="/bookings/new">
            New Booking
          </Button>
          <BookingTableOperations />
        </div>
      </div>
      <div className="space-y-4">
        <BookingTable />
      </div>
    </div>
  );
}

export default Bookings;
