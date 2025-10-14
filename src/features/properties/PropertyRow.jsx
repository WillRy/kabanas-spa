import Table from "../../ui/table/Table.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import Menus from "../../ui/menus/Menus.jsx";
import { Edit, Trash } from "lucide-react";
import Modal from "../../ui/modal/Modal.jsx";
import CreatePropertyForm from "./CreatePropertyForm.jsx";
import { useDeleteProperty } from "./useDeleteProperty.js";
import ConfirmDelete from "../../ui/modal/ConfirmDelete.jsx";

export default function PropertyRow({ property }) {
  const { deleteProperty, isDeletingProperty } = useDeleteProperty();

  return (
    <Table.Row role="row">
      <img
        src={property.image}
        className="block w-16 aspect-[3/2] object-cover object-center"
        style={{ transform: "scale(1.5) translateX(-7px)" }}
      />
      <div className="text-base font-semibold text-gray-600 font-sono">
        {property.name}
      </div>
      <div>Fits up to {property.maxCapacity} guests</div>
      <div className="font-semibold font-sono">
        {formatCurrency(property.regularPrice)}
      </div>
      <div className="font-semibold font-sono text-green-700">
        {property.discount ? (
          formatCurrency(property.discount)
        ) : (
          <span>&mdash;</span>
        )}
      </div>
      <div>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={property.id} />
              <Menus.List id={property.id}>
                <Modal.Open name="edit">
                  <Menus.Button icon={<Edit />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open name="confirm-delete">
                  <Menus.Button icon={<Trash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreatePropertyForm propertyToEdit={property} />
              </Modal.Window>
              <Modal.Window name="confirm-delete">
                <ConfirmDelete disabled={isDeletingProperty} onConfirm={() => deleteProperty(property.id)} resourceName={"Property"} />
              </Modal.Window>
            </Menus.Menu>
          </Menus>
        </Modal>
      </div>
    </Table.Row>
  );
}
