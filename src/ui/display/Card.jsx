import { cx } from "class-variance-authority"

function Card({children, className}) {
    return (
        <div className={cx("w-full p-6 bg-white border border-stone-100 rounded-md", className)}>
            {children}
        </div>
    )
}

export default Card
