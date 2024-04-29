import React from "react";
import noDataImg from "../../../../assets/images/no-data.png";
function NoData() {
  return (
    <div className="text-center">
      <img src={noDataImg} alt="xd" />
      <h3>No Data</h3>
    </div>
  );
}

export default NoData;
