
function ButtonText({children, ...props}) {
    return (
        <button className="cursor-pointer text-primary-600 font-medium text-center transition-all duration-300 bg-none border-none rounded-sm hover:text-primary-700 active:text-primary-700" {...props}>
        {children}
        </button>
    )
}

export default ButtonText
