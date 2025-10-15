import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";


function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl mb-4 font-semibold">Dashboard</h1>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
