import Button from "../button/Button.jsx";



function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="w-2xl">
      <h3 className="font-medium text-2xl mb-3">Delete {resourceName}</h3>
      <p className="text-base">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex gap-4 justify-end">
        <Button variant="secondary" disabled={disabled} onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
