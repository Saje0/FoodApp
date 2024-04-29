import logo from "../../../../assets/images/authlogo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPass() {
  let navigate = useNavigate();

  // Initialize react-hook-form
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Make a POST request to reset password
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      // Redirect user to login page after successful password reset
      navigate("/login");
    } catch (error) {
      // Display error message if there's an error in password reset
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
                <h3> Reset Password</h3>
                <p className="text-muted">
                  Please Enter Your Otp or Check Your Inbox
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="my-md-5">
                  <div className="input-group mb-4">
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
                  <div className="input-group mb-4">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="OTP"
                      className="form-control"
                      {...register("seed", {
                        required: "OTP is required",
                      })}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="form-control"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="input-group mb-4 d-flex">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="form-control"
                      {...register("confirmPassword", {
                        required: "password is required",
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="alert alert-danger">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <button className="btn btn-color w-100 text-white fs-4">
                    Reset Password
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

export default ResetPass;
