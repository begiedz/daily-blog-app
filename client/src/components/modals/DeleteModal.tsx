interface DeleteModalProps {
  name: string;
  onDelete: () => void;
}

const DeleteModal = ({ name, onDelete }: DeleteModalProps) => {
  return (
    <dialog
      id="delete-modal"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          Are you sure you want to delete {name}?
        </h3>
        <p className="py-4">
          This is a destructive function. Data will be erased.
        </p>
        <div className="modal-action">
          <button
            onClick={onDelete}
            className="btn btn-error"
          >
            Delete
          </button>
          <form method="dialog">
            <input
              type="submit"
              value="Cancel"
              className="btn"
            />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
