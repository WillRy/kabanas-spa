function DashboardBox({ children, className = "" }) {
  return (
    <div 
      className={`bg-white border border-gray-100 rounded-md p-8 flex flex-col gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default DashboardBox;
