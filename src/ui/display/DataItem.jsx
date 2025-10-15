

function DataItem({ icon, label, children }) {
  return (
    <div className="flex items-center gap-5 py-2">
      <span className="flex items-center gap-2 font-medium [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-primary-600">
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
