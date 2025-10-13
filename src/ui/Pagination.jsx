import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";


const PAGE_SIZE = 10;
function Pagination({
  count,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
    
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const from = (currentPage - 1) * PAGE_SIZE + 1;

  const to = currentPage === pageCount ? count : currentPage * PAGE_SIZE;

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set("page", next);
      return newParams;
    });
  }

  function prevPage() {
    const prev = currentPage === 1 ? 1 : currentPage - 1;
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set("page", prev);
      return newParams;
    });
  }

  if(pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-sm ml-2">
        Showing <span className="font-semibold">{from}</span> to <span className="font-semibold">{to}</span> of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex gap-1.5">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="outline-0 focus:outline-2 focus:outline-offset-[-1px] focus:outline-primary-600 cursor-pointer disabled:cursor-not-allowed bg-gray-50 hover:bg-primary-600 hover:text-primary-50 disabled:hover:bg-gray-50 disabled:hover:text-inherit border-none rounded font-medium text-sm flex items-center justify-center gap-1 py-1 px-2 transition-colors duration-300 [&:has(span:last-child)]:pl-1 [&>svg]:h-[18px] [&>svg]:w-[18px]"
        >
          <ChevronLeft /> <span>Prev</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="outline-0 focus:outline-2 focus:outline-offset-[-1px] focus:outline-primary-600 cursor-pointer disabled:cursor-not-allowed bg-gray-50 hover:bg-primary-600 hover:text-primary-50 disabled:hover:bg-gray-50 disabled:hover:text-inherit border-none rounded font-medium text-sm flex items-center justify-center gap-1 py-1 px-2 transition-colors duration-300 [&:has(span:first-child)]:pr-1 [&>svg]:h-[18px] [&>svg]:w-[18px]"
        >
          <span>Next</span> <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
