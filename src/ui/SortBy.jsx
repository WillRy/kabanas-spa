import { useSearchParams } from "react-router";
import Select from "./form/Select.jsx";

function SortBy({options}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortField = searchParams.get("sortBy") || options.at(0).value;

    function handleSort(event) {
        searchParams.delete("page");
        searchParams.set("sortBy", event.target.value);
        setSearchParams(searchParams);
    }

    return (
        <Select options={options} value={sortField} onChange={handleSort}/>
    )
}

export default SortBy
