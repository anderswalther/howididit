import React from "react";
import { Link } from "react-router-dom";

const RecipeListItem = ({ recipe }) => (
  <article key={recipe.id} className="recipe-preview">
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
      to={"/admin/recipe/" + recipe.id}
    >
      edit
    </Link>
  </article>
);

export default RecipeListItem;
