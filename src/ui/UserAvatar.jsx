import { useUser } from "../features/authentication/useUser.js";


function UserAvatar() {
  const { user } = useUser();
  return (
    <div className="flex gap-4 items-center font-medium text-sm text-gray-600">
      <img
        src={user.data.avatar ?? "/default-user.jpg"}
        alt={user.data.name}
        className="block w-9 aspect-square object-cover object-center rounded-full outline-2 outline-gray-100"
      />
      <span>{user.data.name}</span>
    </div>
  );
}

export default UserAvatar;
