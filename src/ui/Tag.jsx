  export default function Tag({
    children, type
  }) {
    const color = {
        "blue": "text-blue-700",
        "green": "text-green-700",
        "silver": "text-gray-700",
    }

    const bg = {
        "blue": "bg-blue-100",
        "green": "bg-green-100",
        "silver": "bg-gray-100",
    }

    return <div className={`w-fit uppercase text-xs font-semibold py-1 px-4 rounded-full ${color[type]} ${bg[type]}`}>
        {children}
    </div>
  }