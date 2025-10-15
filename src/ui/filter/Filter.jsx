import { useSearchParams } from "react-router";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(option) {
    searchParams.delete("page");
    searchParams.set(filterField, option.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="border border-gray-100 shadow-sm rounded-sm p-1 flex gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          className={`outline-0 focus:outline-2 focus:outline-offset-[-1px] focus:outline-primary-600 cursor-pointer border border-transparent rounded-sm font-medium text-sm py-1 px-2 transition-colors duration-300 hover:bg-primary-600 hover:text-primary-50 ${
            option.value === currentFilter
              ? "bg-primary-600 text-primary-50"
              : ""
          }`}
          disabled={option.value === currentFilter}
          onClick={() => handleClick(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
