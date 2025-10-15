import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm.jsx"
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm.jsx"

function Account() {
    return (
        <div className="max-w-5xl">
             <h1 className="text-3xl mb-4 font-semibold">Update your account</h1>
             <div className="flex flex-col gap-4">
                <UpdateUserDataForm/>
                <UpdatePasswordForm/>
             </div>
        </div>
    )
}

export default Account
