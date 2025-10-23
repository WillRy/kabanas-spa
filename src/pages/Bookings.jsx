import { useUser } from "../features/authentication/useUser.js";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";

function Bookings() {
  const { hasPermission } = useUser();

  if (!hasPermission("manage-bookings")) {
    return <div>You do not have permission to manage bookings.</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-4">
        <h1 className="text-3xl mb-4 font-semibold">All bookings</h1>
        <BookingTableOperations />
      </div>
      <div className="space-y-4">
        <BookingTable />
      </div>
    </div>
  );
}

export default Bookings;
