function Navbar({ loginData }) {
  console.log(loginData);
  return (
    <div>
      Navbar <span>{loginData?.userEmail}</span>
    </div>
  );
}

export default Navbar;
