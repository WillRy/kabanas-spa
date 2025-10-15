import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useErrorNavigate } from "../../hooks/useErrorNavigate.js";
import Button from "../../ui/button/Button.jsx";
import ButtonText from "../../ui/button/ButtonText.jsx";
import Card from "../../ui/display/Card.jsx";
import Checkbox from "../../ui/form/Checkbox.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Tag from "../../ui/Tag.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import BookingDataBox from "../bookings/BookingDataBox.jsx";
import { useBooking } from "../bookings/useBooking.js";
import { useCheckin } from "../check-in-out/useCheckIn.js";
import { useSettings } from "../settings/useSettings.js";

export default function CheckinBooking() {
  const { booking, isPending, error } = useBooking();
  const { settings, isPending: isPendingSetting } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const navigate = useNavigate();

  useErrorNavigate(error, "/bookings");

  useEffect(() => {
    setConfirmPaid(booking?.data?.isPaid ?? false);
    setAddBreakfast(booking?.data?.hasBreakfast ?? false);

    if (booking?.data?.status !== "unconfirmed" && booking?.data?.id) {
      navigate(`/bookings/${booking?.data?.id}`);
    }
  }, [booking, navigate]);

  if (isPending || isPendingSetting) return <Spinner />;

  if (!booking) return <p>No booking found</p>;

  const { id, status } = booking.data;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking.data;

  const optionalBreakfastPrice =
    (settings.data.breakfastPrice || 0) * numNights * numGuests;

  return (
    <div>
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Check in booking #{id}</h1>
          <Tag type={statusToTagName[status]}>{booking.data.status}</Tag>
        </div>
        <div>
          <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
        </div>
      </div>

      <BookingDataBox booking={booking.data} />

      <div className="flex flex-col gap-4 my-4">
        <Card>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => setAddBreakfast(!addBreakfast)}
            disabled={hasBreakfast}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Card>
        <Card>
          <Checkbox
            id="paid"
            checked={confirmPaid}
            onChange={() => setConfirmPaid(!confirmPaid)}
            disabled={booking.data.isPaid}
          >
            I confirm that {guest.name} has paid the total amount of{" "}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`}{" "}
          </Checkbox>
        </Card>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          variant="primary"
          onClick={() => checkin({ bookingId: id, hasBreakfast: addBreakfast })}
          disabled={isCheckingIn || !confirmPaid}
        >
          Checkin in booking #{bookingId}
        </Button>

        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
}
