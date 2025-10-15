import { useRecentBookings } from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
// import TodayActivity from "../check-in-out/TodayActivity.jsx";
import { useProperties } from "../properties/useProperties.js";
import TodayActivity from "../check-in-out/TodayActivity.jsx";


function DashboardLayout() {
  const {data, isPending: isPendingBookings, numDays} = useRecentBookings();
  // const {confirmedStays, isPending: isPendingStays, numDays} = useRecentStays();
  const {properties, isPending: isPendingCabins} = useProperties();

  if (isPendingBookings || isPendingCabins) {
    return <Spinner />;
  }

  const {
    data: {
      bookings = [],
      confirmedStays = [],
    }
  } = data;

  const propertiesArr = properties?.data?.data ?? [];



  return (
    <div className="grid grid-cols-4 grid-rows-[auto_21rem_auto] gap-[2.4rem]">
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={propertiesArr.length}/>
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays}/>
    </div>
  )
}

export default DashboardLayout

