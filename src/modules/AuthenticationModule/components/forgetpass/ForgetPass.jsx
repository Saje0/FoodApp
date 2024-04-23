import logo from "../../../../assets/images/authlogo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPass() {
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
      // Make a POST request to request password reset
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );

      // Display success message when password reset request is successful
      toast.success(response.data.message, { position: "top-right" });

      // Redirect user to ResetPass page after a delay
      setTimeout(() => {
        navigate("/ResetPass");
      }, 2500);
    } catch (error) {
      // Display error message if there's an error in password reset request
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
              <div className="form-content mx-md-5 my-5">
                <h3>Forgot Your Password?</h3>
                <p className="text-muted">
                  No worries! Please enter your email and we will send a
                  password reset link
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-4 my-md-5">
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

                  <button className="btn btn-color w-100 text-white fs-4">
                    Submit
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

export default ForgetPass;
