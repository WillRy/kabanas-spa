import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";
import TableOperations from "../../ui/table/TableOperations.jsx";

export default function PropertyTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "without-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "regularPrice-asc", label: "Price (low first)" },
          { value: "regularPrice-desc", label: "Price (high first)" },
          { value: "maxCapacity-asc", label: "Capacity (low first)" },
          { value: "maxCapacity-desc", label: "Capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}
