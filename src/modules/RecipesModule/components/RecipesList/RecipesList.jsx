import Header from "../../../SharedModule/components/Header/Header";
import noDataImg from "../../../../assets/images/no-data.png";
import RecipesImg from "../../../../assets/images/header.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
function RecipesList() {
  const [show, setShow] = useState(false);

  const [recipeId, setRecipeId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = (id) => {
    setRecipeId(id);
    setShowDeleteModal(true);
  };

  const [recipesList, setRecipesList] = useState([]);
  const getRecipesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRecipesList(response.data.data);
    } catch (error) {}
  };
  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleDeleteModalClose();
      getRecipesList();
    } catch (error) {}
  };
  useEffect(() => {
    getRecipesList();
  }, []);
  return (
    <>
      <Header
        title={"Recipes List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={RecipesImg}
      />
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <h3>Delete Recipe</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"Recipe"} />
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
              <th scope="col">ID</th>
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Tag</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipesList?.length > 0 ? (
              recipesList?.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    {item.imagePath ? (
                      <img
                        className="recipes-img"
                        src={
                          "https://upskilling-egypt.com:3006/" + item.imagePath
                        }
                        alt="img"
                      />
                    ) : (
                      <img className="recipes-img" src={noDataImg} alt="img" />
                    )}
                  </td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.category[0]?.name}</td>
                  <td>{item.tag.name}</td>
                  <td>
                    <i
                      className="fa fa-edit text-warning mx-2"
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => handleDeleteModalShow(item.id)}
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

export default RecipesList;
