import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  })
  
  const data = allDates.map((date) => {
    const label = format(date, "MMM dd");

    const bookingsForDate = bookings.filter((booking) => isSameDay(date, new Date(booking.created_at)));

    return {
      label,
      totalSales: bookingsForDate.reduce((sum, booking) => sum + booking.totalPrice, 0).toFixed(2),
      extrasSales: bookingsForDate.reduce((sum, booking) => sum + booking.extrasPrice, 0).toFixed(2),
    }
  });


  return (
    <DashboardBox 
      className="col-span-full [&_.recharts-cartesian-grid-horizontal_line]:stroke-gray-300 [&_.recharts-cartesian-grid-vertical_line]:stroke-gray-300"
    >
      <h2 className="text-xl mb-4 font-semibold">Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash; {format(allDates.at(-1), 'MMM dd yyyy')}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <CartesianGrid strokeDasharray="4" />

          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />

          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}

export default SalesChart;
