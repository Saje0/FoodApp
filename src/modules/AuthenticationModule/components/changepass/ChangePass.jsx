import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ChangePass({ logout }) {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      logout();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message), { position: "top-left" };
    }
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          <div className="text-center">
            <img src={logo} alt="logo" className="logo w-75" />
          </div>
          <div className="form-content mx-md-5 ">
            <h3> Change Your Password</h3>
            <p className="text-muted">Enter Your Deatils Below</p>
            <form onSubmit={handleSubmit(onSubmit)} className="my-md-5">
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="text"
                  placeholder="Old Password"
                  className="form-control"
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                />
              </div>
              {errors.oldPassword && (
                <p className="alert alert-danger">
                  {errors.oldPassword.message}
                </p>
              )}
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="text"
                  placeholder="New Password"
                  className="form-control"
                  {...register("newPassword", {
                    required: "New Password is required",
                  })}
                />
              </div>
              {errors.newPassword && (
                <p className="alert alert-danger">
                  {errors.newPassword.message}
                </p>
              )}
              <div className="input-group mb-4 d-flex">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="text"
                  placeholder="Confirm New Password"
                  className="form-control"
                  {...register("confirmNewPassword", {
                    required: "Confirm New Password is required",
                  })}
                />
              </div>
              {errors.confirmNewPassword && (
                <p className="alert alert-danger">
                  {errors.confirmNewPassword.message}
                </p>
              )}
              <button className="btn btn-success w-100">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePass;
