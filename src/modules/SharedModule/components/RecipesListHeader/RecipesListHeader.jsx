import React from "react";
import { useNavigate } from "react-router-dom";

function RecipesListHeader() {
  const navigate = useNavigate();
  const goToRecipesList = () => {
    navigate("/dashboard/recipes");
  };
  return (
    <div className="recipesheader-container p-5 m-3">
      <div className="row">
        <div className="col-md-6">
          <div>
            <h5>
              Fill the <span className="text-success">Recipes !</span>
              <p className="my-2">
                you can now fill the meals easily using the table and form ,
                click here and sill it with the table !
              </p>
            </h5>
          </div>
        </div>
        <div className="col-md-6 text-end ">
          <div className="">
            <button className="btn btn-success p-2" onClick={goToRecipesList}>
              Fill Recipes
              <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipesListHeader;
