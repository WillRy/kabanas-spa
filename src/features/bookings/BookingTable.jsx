import { useError } from "../../hooks/useError.js";
import Menus from "../../ui/menus/Menus";
import Pagination from "../../ui/Pagination.jsx";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/table/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings.js";

function BookingTable() {

  const { bookings,count, isPending, error } = useBookings();

  useError(error);
  

  if (isPending) {
    return <Spinner />;
  }

  if (bookings.length === 0) {
    return <Empty resourceName={"bookings"} />;
  }

  return (
    <Menus>
      <Table columns="1fr 2fr 2fr 1.4fr 0.8fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count}/>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
