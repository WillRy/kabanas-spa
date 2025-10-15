import { useTodayActivity } from "./useTodayActivity.js";
import Spinner from "../../ui/Spinner.jsx";
import TodayItem from "./TodayItem.jsx";

function TodayActivity() {
  const { activities, isPending } = useTodayActivity();

  return (
    <div className="bg-white border border-gray-100 rounded-md p-8 pt-6 flex flex-col gap-2 col-span-2">
      <div className="mb-4" >
        <h2 className="text-xl font-semibold">Today</h2>
      </div>

      {isPending ? (
        <Spinner />
      ) : (
        <>
          {activities.data.length === 0 && (
            <p className="text-center text-lg font-medium mt-2">No activity today...</p>
          )}
          {activities.data.length > 0 && (
            <ul className="overflow-y-auto overflow-x-hidden scrollbar-none">
              {activities.data.map((activity) => (
                <TodayItem key={activity.id} activity={activity}/>
              ))}
            </ul>
          )}
        </>
      )}

    </div>
  );
}

export default TodayActivity;
