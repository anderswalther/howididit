import React from "react";

const ViewSelector = ({
  firstValue,
  secondValue,
  selectedValue,
  onClickHandler
}) => {
  return (
    <div className="view-selector-container">
      <div
        className={
          "view-selector-button " +
          (firstValue === selectedValue ? "selected" : "")
        }
        onClick={() => onClickHandler(firstValue)}
      >
        {firstValue}
      </div>
      <div
        className={
          "view-selector-button " +
          (secondValue === selectedValue ? "selected" : "")
        }
        onClick={() => onClickHandler(secondValue)}
      >
        {secondValue}
      </div>
    </div>
  );
};

export default ViewSelector;
