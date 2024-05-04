import Header from "../../../SharedModule/components/Header/Header";
import HomeImg from "../../../../assets/images/home-avatar.svg";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";
function Dashboard() {
  return (
    <>
      <Header
        title={"Welcome Saje"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={HomeImg}
      />
      <RecipesListHeader />
    </>
  );
}

export default Dashboard;
