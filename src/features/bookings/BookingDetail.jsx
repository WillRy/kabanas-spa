import { useErrorNavigate } from "../../hooks/useErrorNavigate.js";
import ButtonText from "../../ui/button/ButtonText.jsx";
import Button from "../../ui/button/Button.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Tag from "../../ui/Tag.jsx";
import BookingDataBox from "./BookingDataBox.jsx";
import { useBooking } from "./useBooking.js";
import { useNavigate } from "react-router";
import { useDeleteBooking } from "./useDeleteBooking.js";
import Modal from "../../ui/modal/Modal.jsx";
import ConfirmDelete from "../../ui/modal/ConfirmDelete.jsx";
import { useCheckout } from "../check-in-out/useCheckout.js";

export function BookingDetail() {
  const { booking, isPending, error } = useBooking();

  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const { checkout, isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  useErrorNavigate(error, "/bookings");

  if (isPending) return <Spinner />;

  if (!booking) return <p>No booking found</p>;

  const { id, status } = booking.data;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Booking Detail #{id}</h1>
          <Tag type={statusToTagName[status]}>{booking.data.status}</Tag>
        </div>
        <div>
          <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
        </div>
      </div>

      <BookingDataBox booking={booking.data} />

      <div className="flex items-center justify-end gap-4 mt-6">
        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => checkout({ bookingId: id })}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens={"confirm-delete"}>
            <Button variant="danger">Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name={"confirm-delete"}>
            <ConfirmDelete
              resourceName={"Booking"}
              onConfirm={() =>
                deleteBooking(id, {
                  onSuccess: () => navigate("/bookings"),
                })
              }
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>

        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
}
