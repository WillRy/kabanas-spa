import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Menus from "../../ui/menus/Menus";
import Table from "../../ui/table/Table";

import { useDeleteBooking } from "./useDeleteBooking";

import { ArrowDownSquare, ArrowUpSquare, Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import ConfirmDelete from "../../ui/modal/ConfirmDelete.jsx";
import Modal from "../../ui/modal/Modal.jsx";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckout.js";

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guest: { fullName: guestName, email },
    property: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const { checkout, isCheckingOut } = useCheckout();

  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <div className="text-base font-semibold text-gray-600 font-sono">
        {cabinName}
      </div>

      <div className="flex flex-col gap-0.5 [&>span:first-child]:font-medium [&>span:last-child]:text-gray-500 [&>span:last-child]:text-sm">
        <span>{guestName}</span>
        <span>{email}</span>
      </div>

      <div className="flex flex-col gap-0.5 [&>span:first-child]:font-medium [&>span:last-child]:text-gray-500 [&>span:last-child]:text-sm">
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <div className="font-sono font-medium">{formatCurrency(totalPrice)}</div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<Eye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<ArrowDownSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<ArrowUpSquare />}
                onClick={() => checkout({bookingId})}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<Trash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeletingBooking || isCheckingOut}
            resourceName={"Booking"}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
