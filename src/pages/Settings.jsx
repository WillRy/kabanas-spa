import { useUser } from "../features/authentication/useUser.js";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";

function Settings() {
  const { hasPermission } = useUser();

  if (!hasPermission("settings")) {
    return <div>You do not have permission to manage settings.</div>;
  }

  return (
    <div className="">
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
