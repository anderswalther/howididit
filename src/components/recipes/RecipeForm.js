import React from "react";
import MultiSelect from "../common/formElements/MultiSelect";
import Editor from "../common/Editor";

function createDefaultTagValues(selectedTagIds, allTags) {
  const selectedTagObjects = allTags
    .filter(tag => selectedTagIds.includes("" + tag.id))
    .map(tag => {
      return { key: tag.id, value: tag.id, label: tag.label };
    });
  return selectedTagObjects;
}

const RecipeForm = ({
  recipe,
  tags,
  submitHandler,
  onValueChange,
  onTagsValueChange,
  isSaving = false
}) => {
  return (
    <form className="pure-form pure-form-stacked" onSubmit={submitHandler}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={recipe.title}
        onChange={onValueChange}
      />
      <Editor name={"Conten"} value={recipe.content} onChange={onValueChange} />

      <MultiSelect
        allObjects={tags}
        selectedObjectIds={recipe.tags}
        onValueChange={onTagsValueChange}
      />

      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving" : "Save"}
      </button>
    </form>
  );
};
export default RecipeForm;
