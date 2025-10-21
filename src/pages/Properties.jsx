import AddProperty from "../features/properties/AddProperty.jsx"
import PropertyTable from "../features/properties/PropertyTable.jsx"
import PropertyTableOperations from "../features/properties/PropertyTableOperations.jsx"

function Properties() {
    return (
        <div>
            <div className="flex flex-wrap justify-between mb-4">
                <h1 className="text-3xl mb-4 font-semibold">All properties</h1>
                <div className="flex flex-wrap items-center gap-4">
                    <AddProperty />
                    <PropertyTableOperations />
                </div>
            </div>
            <div className="space-y-4">
                <PropertyTable />
                
            </div>
        </div>
    )
}

export default Properties
