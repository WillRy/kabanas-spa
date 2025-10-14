import TableOperations from "../../ui/table/TableOperations.jsx";
import SortBy from "../../ui/SortBy.jsx";
import Filter from "../../ui/Filter.jsx";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"status"}
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked Out" },
          { value: "checked-in", label: "Checked In" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          { value: "totalPrice-desc", label: "Sort by amount (high first)" },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
