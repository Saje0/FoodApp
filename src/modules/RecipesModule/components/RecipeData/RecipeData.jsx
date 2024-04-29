import React from "react";
import { useForm } from "react-hook-form";

function RecipeData() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
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
          <p className="alert alert-danger">{errors.password.message}</p>
        )}
        <div className="links d-flex justify-content-between my-3">
          <a>Register Now?</a>
          <a onClick={handleClick} className="link">
            Forgot Password?
          </a>
        </div>
        <button className="btn btn-color w-100 text-white p-4">Login</button>
      </form>
    </div>
  );
}

export default RecipeData;
