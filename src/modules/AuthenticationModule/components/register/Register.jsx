import logo from "../../../../assets/images/authlogo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };
  const onSubmit = async (data) => {
    let registerFormData = appendToFormData(data);
    try {
      // Make a POST request to login
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        registerFormData
      );
      navigate("/verifyAccount");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-left" });
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid vh-100">
          <div className="row vh-100 justify-content-center align-items-center bg-overlay">
            <div className="col-md-6 bg-white p-4 rounded">
              <div className="text-center">
                <img src={logo} alt="logo" className="logo" />
              </div>
              <div className="form-content mx-md-5 ">
                <h3>Register Now</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-1">
                        <span className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Enter your user name"
                          className="form-control"
                          {...register("userName", {
                            required: "User Name is required",
                          })}
                        />
                      </div>
                      {errors.userName && (
                        <p className="alert alert-danger">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="input-group mb-1">
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
                        <p className="alert alert-danger">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-1">
                        <span className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Country"
                          className="form-control"
                          {...register("country", {
                            required: "Country  is required",
                          })}
                        />
                      </div>
                      {errors.country && (
                        <p className="alert alert-danger">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="input-group mb-1">
                        <span className="input-group-text">
                          <i className="fa fa-envelope"></i>
                        </span>
                        <input
                          type="number"
                          placeholder="Phone Number "
                          className="form-control"
                          {...register("phoneNumber", {
                            required: "phoneNumber is required",
                          })}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="alert alert-danger">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-1">
                        <span className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          placeholder="Password"
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
                    </div>
                    <div className="col-md-6">
                      <div className="input-group mb-1">
                        <span className="input-group-text">
                          <i className="fa fa-envelope"></i>
                        </span>
                        <input
                          type="password"
                          placeholder="Confirm-Password"
                          className="form-control"
                          {...register("confirmPassword", {
                            required: "confirmPassword is required",
                          })}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="alert alert-danger">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-group mb-1">
                        <input
                          type="file"
                          placeholder="Profile Image"
                          className="form-control"
                          {...register("profileImage", {
                            required: "profileImage is required",
                          })}
                        />
                      </div>
                      {errors.profileImage && (
                        <p className="alert alert-danger">
                          {errors.profileImage.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Link
                      className="links d-flex justify-content-end  my-3"
                      to="/login"
                    >
                      Login?
                    </Link>
                  </div>
                  <button className="btn btn-color w-100 text-white p-4">
                    Register
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

export default Register;
