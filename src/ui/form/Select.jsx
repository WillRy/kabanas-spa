

function Select({options, value, onChange, ...props}) {
  return (
    <select value={value} onChange={onChange} {...props} className="outline-0 focus:outline-2 focus:outline-offset-[-1px] focus:outline-primary-600 text-sm p-2 px-3 border border-gray-100 rounded-sm bg-white font-medium shadow-sm">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
