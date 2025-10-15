function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="flex items-center gap-4">
      <input
        className="h-6 w-6 outline-offset-2 origin-left transform accent-primary-600 disabled:accent-primary-300"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        className="flex-1 flex items-center gap-0.5"
        htmlFor={!disabled ? id : ""}
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
