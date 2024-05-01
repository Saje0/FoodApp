import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
function EditModal({
  getCategoriesList,
  showModal,
  setShowModal,
  rowData,
  setRowData,
}) {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${rowData.id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setShowModal(false);
        setRowData({});
        getCategoriesList();
      });
  };
  return (
    <div>
      {Object.keys(rowData).length > 0 && (
        <Modal
          show={showModal}
          onHide={() => {
            setRowData({});
            setShowModal(false);
          }}
        >
          <Modal.Header closeButton>
            <h3>Edit Category</h3>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-4 my-md-5">
                <input
                  defaultValue={rowData?.name}
                  type="text"
                  placeholder="Category Name"
                  className="form-control"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="alert alert-danger">{errors.name.message}</p>
              )}
              <button type="submit" className="btn btn-success w-100">
                Save
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
export default EditModal;
