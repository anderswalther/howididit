import React from "react";
import { Link } from "react-router-dom";
import RecipeListViewItem from "./RecipeListViewItem";

const RecipeListView = ({ recipes }) => (
  <div className="page-content">
    <div className="content-actions">
      <button className="btn">
        <Link to={"/recipe"}>Add</Link>
      </button>
    </div>
    {recipes.map(recipe => {
      return (
        <RecipeListViewItem
          recipe={recipe}
          key={recipe.id}
        ></RecipeListViewItem>
      );
    })}
  </div>
);

export default RecipeListView;
