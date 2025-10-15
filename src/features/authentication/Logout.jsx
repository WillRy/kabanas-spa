import { LogOut } from "lucide-react"
import ButtonIcon from "../../ui/button/ButtonIcon.jsx"
import { useLogout } from "./useLogout.js"
import SpinnerMini from "../../ui/SpinnerMini.jsx"

function Logout() {
    const { logout, isPending } = useLogout()
    return (
        <ButtonIcon onClick={logout}>
            {isPending ? <SpinnerMini /> : <LogOut />}
        </ButtonIcon>
    )
}

export default Logout
