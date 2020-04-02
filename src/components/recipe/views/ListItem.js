import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeList from "./List";

const RecipeListItem = ({ recipe, isActive }) => {
  return (
    <article
      key={recipe.id}
      className={"recipe-preview " + (isActive ? "active-item" : "")}
    >
      <h3>
        {" "}
        <Link to={"/recipes/" + recipe.id}>{recipe.title}</Link>
      </h3>

      <p className="recipe-meta">
        By{" "}
        <a className="recipe-author" href="#">
          {recipe.authorName}
        </a>{" "}
      </p>

      <div className="recipe-description">
        <p>{recipe.abstract}</p>
      </div>
      {recipe.tags.map(tag => {
        return (
          <a key={tag.id} className="pure-button button-xsmall tag" href="#">
            {tag.label + "  "} - {tag.id}
          </a>
        );
      })}
      <Link
        className="button-xsmall button-secondary pure-button"
        to={"/recipes/" + recipe.id + "/edit"}
      >
        edit
      </Link>
    </article>
  );
};

RecipeListItem.propTypes = {
  isActive: PropTypes.bool.isRequired
};
export default RecipeListItem;
