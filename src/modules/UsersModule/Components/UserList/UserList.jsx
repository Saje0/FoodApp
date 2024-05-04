import Header from "../../../SharedModule/components/Header/Header";
import UsersImg from "../../../../assets/images/header.png";
import noDataImg from "../../../../assets/images/no-data.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";

function UserList() {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nameValue, setNameValue] = useState("");
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const [usersList, setUsersList] = useState([]);
  const getUsersList = async (name, pageSize, pageNumber) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Users?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { userName: name },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setUsersList(response.data.data);
    } catch (error) {}
  };
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getUsersList(input.target.value, 10, 1);
  };
  useEffect(() => {
    getUsersList("", 10, 1);
  }, []);
  return (
    <>
      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={UsersImg}
      />

      <div className="container-fluid p-5 recipesList-container">
        <div className="row">
          <div className="col-md-6 my-2">
            <h4>Users Table Details</h4>
            <span>You can check all details</span>
          </div>
        </div>
        <div className="filteration my-3">
          <div className="row">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search By User Name..."
                onChange={getNameValue}
              />
            </div>
            <div className="col-md-3">
              <select
                type="text"
                className="form-control"
                // onChange={getCategoryValue}
              >
                <option value="">System User</option>
                {/* {categoriesList.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">User Name</th>
              <th scope="col">User E-mail</th>
              <th scope="col">Country</th>
              <th scope="col">Image</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {usersList?.length > 0 ? (
              usersList?.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>

                  <td>
                    {user.imagePath ? (
                      <img
                        className="recipes-img"
                        src={
                          "https://upskilling-egypt.com:3006/" + user.imagePath
                        }
                        alt="img"
                      />
                    ) : (
                      <img className="recipes-img" src={noDataImg} alt="img" />
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>
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
            {arrayOfPages.map((pageNumber) => (
              <li
                className="page-item"
                key={Math.random()}
                onClick={() => getUsersList(nameValue, 5, pageNumber)}
              >
                <a className="page-link">{pageNumber}</a>
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

export default UserList;
