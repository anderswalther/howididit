import React from "react";
import CreatableSelect from "react-select/creatable";

function createDefaultTagValues(selectedObjectIds, allObjects) {
  return allObjects
    .filter(obj => selectedObjectIds.includes("" + obj.id))
    .map(obj => {
      return { key: obj.id, value: obj.id, label: obj.label };
    });
}

const MultiSelect = ({ selectedObjectIds, allObjects, onValueChange }) => {
  return (
    <CreatableSelect
      isMulti
      options={allObjects.map(object => {
        return { value: object.id, label: object.label };
      })}
      value={createDefaultTagValues(selectedObjectIds, allObjects)}
      onChange={onValueChange}
      className="selectField"
    />
  );
};

export default MultiSelect;
