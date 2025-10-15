import Tag from "../../ui/Tag.jsx";
import Button from "../../ui/button/Button.jsx";
import { Link } from "react-router";
import { useCheckout } from "./useCheckout.js";

function TodayItem({ activity }) {
  const { id, status, guest, numNights } = activity;

  const { checkout, isCheckingOut } = useCheckout();

  return (
    <li className="grid grid-cols-[6rem_1rem_1fr_0.6fr_1fr] gap-3 items-center text-sm py-2 border-b border-gray-100 first:border-t first:border-t-gray-100">
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <img
        className="size-4"
        src={guest.countryFlag}
        alt={`Flag of ${guest.nationality}`}
        title={`Flag of ${guest.nationality}`}
      />
      <div className="font-medium">{guest.name}</div>
      <div>
        {numNights} {numNights === 1 ? "night" : "nights"}
      </div>

      {status === "unconfirmed" && (
        <Button size="small" variant="primary" as={Link} to={`/checkin/${id}`}>
          Check In
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          size="small"
          onClick={() => checkout({ bookingId: id })}
          disabled={isCheckingOut}
        >
          Check Out
        </Button>
      )}
    </li>
  );
}

export default TodayItem;
