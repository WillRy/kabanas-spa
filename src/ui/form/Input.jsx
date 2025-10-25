import { cx } from "class-variance-authority";

function Input({ ref, type = "text", ...props }) {
  return (
    <input
      ref={ref}
      type={type}
      className={
        cx(props.className, "w-full block p-2 border border-primary-100 outline-0 focus:outline-2 focus:outline-offset-[-1px] focus:outline-primary-600 rounded-md disabled:bg-stone-100 text-sm")
      }
      {...props}
    />
  );
}

export default Input;
