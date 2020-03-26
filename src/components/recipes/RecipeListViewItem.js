import React from "react";
import { Link } from "react-router-dom";

const RecipeListViewItem = ({ recipe }) => (
  <article key={recipe.id} className="recipe-preview">
    <h2>{recipe.title}</h2>

    <p className="recipe-meta">
      By{" "}
      <a className="recipe-author" href="#">
        Eric Ferraiuolo
      </a>{" "}
      under{" "}
      <a className="recipe-category" href="#">
        JavaScript
      </a>
    </p>

    <div className="recipe-description">
      <p>{recipe.abstract}</p>
    </div>

    <Link
      className="button-xsmall button-success pure-button"
      to={"/recipe/" + recipe.id}
    >
      read more
    </Link>
    <Link
      className="button-xsmall button-secondary pure-button"
      to={"/admin/recipe/" + recipe.id}
    >
      edit
    </Link>
  </article>
);

export default RecipeListViewItem;
