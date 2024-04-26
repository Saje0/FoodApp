import notFoundImage from "../../../../assets/images/not-found-bg.png";
import logo from "../../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
function Notfound() {
  let navigate = useNavigate();
  const handleClick = () => navigate("/login");
  return (
    <>
      <div className="notFound-container">
        <div className="container-fluid vh-100">
          <img src={logo} alt="logo" className="logo" />
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="p-md-5 text-left">
              <h1>Oops.</h1>
              <h2 className="text-success">Page not found.</h2>
              <p className="paragraph">
                This Page doesn’t exist or was removed! We suggest you back to
                home.
              </p>
              <div>
                <button className="btn text-white" onClick={handleClick}>
                  <i class="fa-solid fa-arrow-left icon"></i>
                  Back To Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Notfound;
