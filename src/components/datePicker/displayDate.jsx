import React from "react";

export default function DisplayDate(props) {
  const { selectedDay, dateObject } = props;
  return (
    <>
      <div className="showDate">
        {selectedDay +
          "/" +
          dateObject.format("MMMM") +
          "/" +
          dateObject.format("Y")}
      </div>
    </>
  );
}
