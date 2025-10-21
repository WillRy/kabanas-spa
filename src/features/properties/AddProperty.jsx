import Button from "../../ui/button/Button.jsx";
import Modal from "../../ui/modal/Modal.jsx";
import CreatePropertyForm from "./CreatePropertyForm.jsx";

function AddProperty() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-property">
          <Button size="md">Add Property</Button>
        </Modal.Open>
        <Modal.Window name="add-property">
          <CreatePropertyForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddProperty;
