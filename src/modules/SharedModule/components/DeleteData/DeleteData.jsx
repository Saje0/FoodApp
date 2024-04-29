import React from "react";
import DeleteImg from "../../../../assets/images/no-data.png";
function DeleteData({ deleteItem }) {
  return (
    <div className="text-center">
      <img src={DeleteImg} alt="delete" />
      <h3>Delete this {deleteItem}?</h3>
      <p>
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
}

export default DeleteData;
