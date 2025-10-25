import AsyncSelect from "react-select/async";

function AsyncSearch({ ref, load,selected, onChange, ...props }) {
  return (
    <AsyncSelect
      ref={ref}
      cacheOptions
      loadOptions={load}
      defaultOptions
      onChange={(option) => onChange(option)}
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused
            ? "var(--color-primary-600)"
            : "var(--color-primary-100)",
          "&:hover": {
            borderColor: state.isFocused
              ? "var(--color-primary-600)"
              : "var(--color-primary-100)",
          },
          boxShadow: state.isFocused
            ? "0 0 0 1px var(--color-primary-600)"
            : base.boxShadow,
        }),
      }}
      value={selected}
      {...props}
    />
  );
}

export default AsyncSearch;
