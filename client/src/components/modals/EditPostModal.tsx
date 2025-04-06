const EditPostModal = () => {
  return (
    <dialog
      id="edit-post-modal"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit {'title'}</h3>
        <div className="modal-action">
          <form method="dialog">
            <input
              type="submit"
              value={'Update'}
              className="btn btn-info"
            />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditPostModal;
