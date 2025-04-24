interface DeleteModalProps {
  name: string | null;
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
          Are you sure you want to delete {name || '...'}?
        </h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
            ✕
          </button>
        </form>
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
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
