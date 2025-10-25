import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./Input.jsx";
import React from "react";

const CustomInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} className="w-full block p-2 border border-primary-100 outline-0 focus:outline-2 focus:outline-offset-[-1px] focus:outline-primary-600 rounded-md disabled:bg-stone-100 text-sm"/>
));

function DateRange({ startDate, endDate, setDateRange,onChange, ...props }) {
  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
        onChange?.(update);
      }}
      selectsRange
      isClearable
      customInput={<CustomInput />}
      {...props}
    />
  );
}

export default DateRange;
