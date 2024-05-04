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
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const navigate = useNavigate();
  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = (id) => {
    setRecipeId(id);
    setShowDeleteModal(true);
  };

  const getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);
      setCategoriesList(response.data.data);
    } catch (error) {}
  };
  const getTagsList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTagsList(response.data);
    } catch (error) {}
  };

  const getRecipesList = async (name, tagId, catId, pageSize, pageNumber) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            name: name,
            tagId: tagId,
            categoryId: catId,
            // pageSize: pageSize,
            // pageNumber: pageNumber,
          },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(arrayOfPages);
      console.log(response.data.totalNumberOfPages);
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
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(input.target.value, tagValue, categoryValue, 5, 1);
  };
  const getCategoryValue = (input) => {
    setCategoryValue(input.target.value);
    getRecipesList(nameValue, tagValue, input.target.value, 5, 1);
  };
  const getTagsValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(nameValue, input.target.value, categoryValue, 5, 1);
  };
  const goToRecipeData = () => {
    navigate("/dashboard/recipeData");
  };
  useEffect(() => {
    getRecipesList("", "", "", 5, 1);
    getCategoriesList();
    getTagsList();
  }, []);
  return (
    <>
      <Header
        title={"Recipes Items"}
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
      <div className="container-fluid p-5 recipesList-container">
        <div className="row">
          <div className="col-md-6">
            <h4>Recipes Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end ">
            <button className="btn btn-success " onClick={goToRecipeData}>
              Add New Item
            </button>
          </div>
        </div>
        <div className="filteration my-3">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search By Recipe Name..."
                onChange={getNameValue}
              />
            </div>
            <div className="col-md-3">
              <select
                type="text"
                className="form-control"
                onChange={getCategoryValue}
              >
                <option value="">Search By Category</option>
                {categoriesList.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                type="text"
                className="form-control"
                onChange={getTagsValue}
              >
                <option value="">Search By Tag</option>
                {tagsList.map((tag) => (
                  <option value={tag.id} key={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Tag</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipesList?.length > 0 ? (
              recipesList?.map((item, index) => (
                <tr key={item.id}>
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
                  <td>{item.price}</td>
                  <td>{item.description}</td>
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
              <tr>
                <td colSpan="8">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {arrayOfPages.map((pageNo) => (
              <li
                className="page-item"
                key={Math.random()}
                onClick={() =>
                  getRecipesList(nameValue, tagValue, categoryValue, 5, pageNo)
                }
              >
                <a className="page-link">{pageNo}</a>
              </li>
            ))}

            <li className="page-item">
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default RecipesList;
