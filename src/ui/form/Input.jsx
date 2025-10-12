function Input({ ref, type = "text", ...props }) {
  return (
    <input
      ref={ref}
      type={type}
      className="w-full block p-2 border border-primary-100 outline-0 focus:ring-2 focus:ring-primary-400 rounded-md disabled:bg-stone-100 text-sm"
      {...props}
    />
  );
}

export default Input;
