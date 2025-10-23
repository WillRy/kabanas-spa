import { useError } from "../../hooks/useError.js";
import Pagination from "../../ui/Pagination.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Table from "../../ui/table/Table.jsx";
import PropertyRow from "./PropertyRow.jsx";
import { useProperties } from "./useProperties.js";

export default function PropertyTable() {
  const { properties, isPending, error } = useProperties();

  useError(error);

  if (isPending) {
    return <Spinner />;
  }


  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={properties?.data?.data ?? []}
        render={(property) => (
          <PropertyRow property={property} key={property.id} />
        )}
      />
      <Table.Footer>
        <Pagination count={properties?.data?.total ?? 0} />
      </Table.Footer>
    </Table>
  );
}
