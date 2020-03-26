import React from "react";
import MultiSelect from "../common/formElements/MultiSelect";

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
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        rows="15"
        cols="50"
        value={recipe.content}
        onChange={onValueChange}
      ></textarea>
      <label htmlFor="tags">Tags</label>

      <MultiSelect
        allObjects={tags}
        selectedObjectIds={recipe.tags}
        onValueChange={onTagsValueChange}
      />

      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving" : "Save"}
      </button>
      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving" : "Save"}
      </button>
    </form>
  );
};

export default RecipeForm;
