import Header from "../../../SharedModule/components/Header/Header";
import UsersImg from "../../../../assets/images/header.png";
function UserList() {
  return (
    <>
      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={UsersImg}
      />
    </>
  );
}

export default UserList;
