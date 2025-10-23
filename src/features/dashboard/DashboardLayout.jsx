import { useRecentBookings } from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
// import TodayActivity from "../check-in-out/TodayActivity.jsx";
import { useProperties } from "../properties/useProperties.js";
import TodayActivity from "../check-in-out/TodayActivity.jsx";
import { useUser } from "../authentication/useUser.js";


function DashboardLayout() {
  const {hasPermission} = useUser();
  const {data, isPending: isPendingBookings, numDays} = useRecentBookings();
  // const {confirmedStays, isPending: isPendingStays, numDays} = useRecentStays();
  const {total, isPending: isPendingCabins} = useProperties();

  if (isPendingBookings || isPendingCabins) {
    return <Spinner />;
  }

  const {
    data: {
      bookings = [],
      confirmedStays = [],
    }
  } = data;

  if(!hasPermission('manage-bookings')|| !hasPermission('manage-properties')){
    return <div></div>
  }

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_21rem_auto] gap-[2.4rem]">
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={total}/>
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays}/>
    </div>
  )
}

export default DashboardLayout

