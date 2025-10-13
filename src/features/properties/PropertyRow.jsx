import Table from "../../ui/table/Table.jsx";
import { formatCurrency } from "../../utils/helpers.js";

export default function PropertyRow({ property }) {
  return (
    <Table.Row role="row">
      <img
        src={property.image}
        className="block w-16 aspect-[3/2] object-cover object-center"
        style={{ transform: "scale(1.5) translateX(-7px)" }}
      />
      <div className="text-base font-semibold text-gray-600 font-sono">{property.name}</div>
      <div>Fits up to {property.maxCapacity} guests</div>
      <div className="font-semibold font-sono">
        {formatCurrency(property.regularPrice)}
      </div>
      <div className="font-semibold font-sono text-green-700">
        {property.discount ? (
          formatCurrency(property.discount)
        ) : (
          <span>&mdash;</span>
        )}
      </div>
      <div></div>
    </Table.Row>
  );
}
