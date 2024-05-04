import logo from "../../../assets/images/authlogo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifyAccount() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data
      );
      navigate("/login");
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
                <h3>Verify Account</h3>
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
                      placeholder="OTP"
                      className="form-control"
                      {...register("code", {
                        required: "code is required",
                      })}
                    />
                  </div>
                  {errors.code && (
                    <p className="alert alert-danger">{errors.code.message}</p>
                  )}
                  <button className="btn btn-color w-100 text-white p-4">
                    Verify
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

export default VerifyAccount;
