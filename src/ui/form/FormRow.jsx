function FormRow({
    label,
    error,
    className = "",
    children
}) {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            {children}
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    )
}

export default FormRow
