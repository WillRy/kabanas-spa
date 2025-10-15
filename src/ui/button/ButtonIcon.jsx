
function ButtonIcon({ children, ...props }) {
  return (
    <button
      className={`bg-none border-none p-1 rounded-sm transition-all duration-200 hover:bg-gray-100 [&_svg]:size-6 [&_svg]:text-primary-600`}
      {...props}
    >
        {children}
    </button>
  );
}

export default ButtonIcon;
