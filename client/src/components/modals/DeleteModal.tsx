const DeleteModal = () => {
  return (
    <dialog
      id="delete-modal"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Are you sure?</h3>
        <p className="py-4">
          This is a destructive function. Data will be erased.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <input
              type="submit"
              value={'Delete'}
              className="btn btn-error"
            />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
