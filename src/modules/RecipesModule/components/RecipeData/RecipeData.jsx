import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";
function RecipeData() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getTagsList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      setTagsList(response.data);
    } catch (error) {}
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
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };
  const onSubmit = async (data) => {
    let recipeFormData = appendToFormData(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        recipeFormData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(response.data.message);
      navigate("/dashboard/recipes");
    } catch (error) {}
  };
  useEffect(() => {
    getCategoriesList();
    getTagsList();
  }, []);
  return (
    <>
      <RecipesListHeader />
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-1">
            <input
              type="text"
              placeholder="Recipe Name"
              className="form-control"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
          {errors.name && (
            <p className="alert alert-danger p-2">{errors.name.message}</p>
          )}
          <div className="input-group mb-1">
            <select
              className="form-control"
              {...register("tagId", {
                required: "tagId is required",
              })}
            >
              <option value="">Select</option>
              {tagsList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          {errors.tagId && (
            <p className="alert alert-danger p-2">{errors.tagId.message}</p>
          )}
          <div className="input-group mb-1">
            <input
              type="number"
              placeholder="Recipe Price"
              className="form-control"
              {...register("price", {
                required: "price is required",
              })}
            />
          </div>
          {errors.price && (
            <p className="alert alert-danger p-2">{errors.price.message}</p>
          )}
          <div className="input-group mb-1">
            <select
              className="form-control"
              {...register("categoriesIds", {
                required: "categoriesIds is required",
              })}
            >
              <option value="">Select</option>
              {categoriesList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {errors.categoriesIds && (
            <p className="alert alert-danger p-2">
              {errors.categoriesIds.message}
            </p>
          )}
          <div className="input-group mb-1">
            <textarea
              placeholder="Recipe Description"
              className="form-control"
              {...register("description", {
                required: "description is required",
              })}
            />
          </div>
          {errors.description && (
            <p className="alert alert-danger p-2">
              {errors.description.message}
            </p>
          )}
          <div className="input-group mb-1">
            <input
              type="file"
              placeholder="Recipe Name"
              className="form-control"
              {...register("recipeImage", {
                required: "Image is required",
              })}
            />
          </div>
          {errors.recipeImage && (
            <p className="alert alert-danger p-2">
              {errors.recipeImage.message}
            </p>
          )}
          <button className="btn btn-success">Save</button>
        </form>
      </div>
    </>
  );
}

export default RecipeData;
