import logo from "../../../../assets/images/authlogo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ saveLoginData }) {
  let navigate = useNavigate();

  // Function to navigate to the forgot password page
  const handleClick = () => navigate("/forgetPass");

  // Initialize react-hook-form
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Make a POST request to login
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );

      // Store the token in local storage
      localStorage.setItem("token", response.data.token);

      // Call saveLoginData function passed from parent component
      saveLoginData();

      // Redirect user to dashboard
      navigate("/dashboard");
    } catch (error) {
      // Display error message if there's an error in login
      toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-container">
        <div className="container-fluid vh-100">
          <div className="row vh-100 justify-content-center align-items-center bg-overlay">
            <div className="col-md-6 bg-white p-4 rounded">
              <div className="text-center">
                <img src={logo} alt="logo" className="logo" />
              </div>
              <div className="form-content mx-md-5 ">
                <h3>Log In</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your E-mail"
                      className="form-control"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%=-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid mail",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Password"
                      className="form-control"
                      {...register("password", {
                        required: "password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="links d-flex justify-content-between my-3">
                    <a>Register Now?</a>
                    <a onClick={handleClick} className="link">
                      Forgot Password?
                    </a>
                  </div>
                  <button className="btn btn-color w-100 text-white fs-4">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
