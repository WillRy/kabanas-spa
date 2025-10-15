
import Stat from "./Stat.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { Banknote, Briefcase, CalendarDays, ChartBar } from "lucide-react";

function Stats({bookings, confirmedStays, numDays, cabinCount}) {
    const numBookings = bookings.length;

    const sales = bookings.reduce((acc, cur) => cur.totalPrice + acc, 0);

    const checkIns = confirmedStays.length

    // num checked in nights / total available nights(Num days * num cabins)
    const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

    return (
        <>
            <Stat title={'Bookings'} color={'blue'} icon={<Briefcase/>}  value={numBookings}/>   
            <Stat title={'Sales'} color={'green'} icon={<Banknote/>}  value={formatCurrency(sales)}/>   
            <Stat title={'Check ins'} color={'indigo'} icon={<CalendarDays/>}  value={checkIns}/>   
            <Stat title={'Occupancy rate'} color={'yellow'} icon={<ChartBar/>}  value={Math.round(occupation * 100) + '%'}/>   
        </>
    )
}

export default Stats
