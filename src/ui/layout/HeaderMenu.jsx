import { LogOut, User } from "lucide-react";
import ButtonIcon from "../button/ButtonIcon.jsx";
import Logout from "../../features/authentication/Logout.jsx";
import { useNavigate } from "react-router";

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <ul className="flex gap-2">
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <User />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
