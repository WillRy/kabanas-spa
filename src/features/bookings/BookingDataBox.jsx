import {
  CheckCheckIcon,
  CheckCircle,
  CircleDollarSign,
  CurrencyIcon,
  DollarSign,
  House,
} from "lucide-react";

import Button from "../../ui/button/Button.jsx";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { MessageSquareText } from "lucide-react";
import DataItem from "../../ui/display/DataItem.jsx";

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    propertyPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guest: { name: guestName, email, country, countryFlag, nationalID },
    property: { name: cabinName },
  } = booking;

  return (
    <div>
      <div className="rounded-md overflow-hidden">
        <div className="flex items-center justify-between bg-primary-500 py-5 px-10 text-white font-semibold">
          <div className="flex items-center gap-4">
            <House className="size-7" />
            <span>
              {numNights} nights in Cabin {cabinName}
            </span>
          </div>
          <div>
            <p>
              {format(new Date(startDate), "EEE, MMM dd yyyy")} (
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}
              ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
            </p>
          </div>
        </div>
        <div className="bg-white">
          <div className="py-8 pb-3 px-10">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={countryFlag}
                alt={country}
                className="max-w-5 block rounded-xs"
              />
              <p className="font-medium text-gray-700">
                {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
              </p>
              <span>&bull;</span>
              <p>{email}</p>
              <span>&bull;</span>
              <p>National ID {nationalID}</p>
            </div>

            {observations && (
              <DataItem icon={<MessageSquareText />} label="Observations">
                {observations}
              </DataItem>
            )}
            <DataItem icon={<CheckCircle />} label="Breakfast included">
              {hasBreakfast ? "Yes" : "No"}
            </DataItem>

            <div
              className={`
                flex items-center justify-between 
                py-5 px-8 
                rounded-sm mt-8 
                [&_svg]:text-current!
                data-[is-paid=true]:bg-green-100 data-[is-paid=true]:text-green-700 
                data-[is-paid=false]:bg-yellow-100 data-[is-paid=false]:text-yellow-700
            `}
              data-is-paid={isPaid}
            >
              <DataItem icon={<CircleDollarSign />} label={`Total price`}>
                {formatCurrency(totalPrice)}

                {hasBreakfast &&
                  ` (${formatCurrency(propertyPrice)} cabin + ${formatCurrency(
                    extrasPrice
                  )} breakfast)`}
              </DataItem>

              <p className="uppercase text-sm font-semibold">
                {isPaid ? "Paid" : "Will pay at property"}
              </p>
            </div>
          </div>
          <div className="py-4 px-10 text-gray-500 text-right text-xs">
            <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default BookingDataBox;
