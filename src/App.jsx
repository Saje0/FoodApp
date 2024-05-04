/* eslint-disable no-unused-vars */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import Notfound from "./modules/SharedModule/components/Notfound/Notfound";
import MasterLayout from "./modules/SharedModule/components/MatserLayout/MasterLayout";
import Dashboard from "./modules/HomeModule/components/Dashboard/Dashboard";
import RecipesList from "./modules/RecipesModule/components/RecipesList/RecipesList";
import CategoriesList from "./modules/CategoriesModule/components/CategoriesList/CategoriesList";
import UserList from "./modules/UsersModule/Components/UserList/UserList";
import Login from "./modules/AuthenticationModule/components/login/Login";
import ForgetPass from "./modules/AuthenticationModule/components/forgetpass/ForgetPass";
import Register from "./modules/AuthenticationModule/components/register/Register";
import ResetPass from "./modules/AuthenticationModule/components/resetpass/ResetPass";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import RecipeData from "./modules/RecipesModule/components/RecipeData/RecipeData";
import { ToastContainer } from "react-toastify";
import VerifyAccount from "./modules/AuthenticationModule/VerifyAccount/VerifyAccount";

function App() {
  let [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  let routes = createBrowserRouter([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        // { index: "dashboard", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipeData", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UserList /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout loginData={loginData} />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        {
          path: "login",
          element: <Login saveLoginData={saveLoginData} />,
        },
        { path: "register", element: <Register /> },
        { path: "verifyAccount", element: <VerifyAccount /> },
        { path: "forgotpass", element: <ForgetPass /> },
        { path: "resetpass", element: <ResetPass /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
