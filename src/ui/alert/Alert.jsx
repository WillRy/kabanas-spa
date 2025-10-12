import { cva } from "class-variance-authority"

const AlertCVA = cva(['p-2', 'rounded-md', 'text-sm', 'font-medium', 'border'], {
    variants: {
        type: {
            info: ['bg-blue-50', 'text-blue-700', 'border-blue-200'],
            success: ['bg-green-50', 'text-green-400', 'border-green-200'],
            warning: ['bg-yellow-50', 'text-yellow-400', 'border-yellow-200'],
            error: ['bg-red-50', 'text-red-400', 'border-red-200'],
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        }
    },
    defaultVariants: {
        type: 'info'
    }
})

function Alert({
    type = "info",
    align = "left",
    children
}) {
    return (
        <div className={AlertCVA({ type, align })}>
            {children}
        </div>
    )
}

export default Alert
