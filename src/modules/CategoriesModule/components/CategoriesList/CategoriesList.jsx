import Header from "../../../SharedModule/components/Header/Header";
import CategoriesImg from "../../../../assets/images/header.png";
import { useEffect, useState } from "react";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [show, setShow] = useState(false);

  const [categoryId, setCategoryId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = (id) => {
    setCategoryId(id);
    setShowDeleteModal(true);
  };

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategoriesList(response.data.data);
    } catch (error) {}
  };
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleClose();
      getCategoriesList();
    } catch (error) {}
  };
  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleDeleteModalClose();
      getCategoriesList();
    } catch (error) {}
  };
  useEffect(() => {
    getCategoriesList();
  }, []);
  return (
    <>
      <Header
        title={"Categories List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={CategoriesImg}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Add Category</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-4 my-md-5">
              <input
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
            <button className="btn btn-success w-100">Save</button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <h3>Delete Category</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"Category"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-md-6">
            <h4>Categories Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end ">
            <button className="btn btn-success " onClick={handleShow}>
              Add New Category
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList?.length > 0 ? (
              categoriesList?.map((category, index) => (
                <tr key={category.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                    <i
                      className="fa fa-edit text-warning mx-2"
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => handleDeleteModalShow(category.id)}
                      className="fa fa-trash text-danger"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CategoriesList;
