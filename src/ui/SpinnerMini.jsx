import { Loader } from "lucide-react";

function SpinnerMini() {
    return (
        <div className="h-6 w-6">
            <Loader className="animate-spin"/>
        </div>
    )
}

export default SpinnerMini
