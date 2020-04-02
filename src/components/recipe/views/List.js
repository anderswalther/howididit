import React from "react";
import { Link } from "react-router-dom";
import RecipeListItem from "./ListItem";

const RecipeList = ({ recipes, activeRecipeId }) => (
  <>
    <div className="content-actions">
      <button className="btn">
        <Link to={"/recipe"}>Add</Link>
      </button>
    </div>
    {recipes.map(recipe => {
      let isActive = recipe.id === activeRecipeId;
      return (
        <RecipeListItem
          recipe={recipe}
          key={recipe.id}
          isActive={isActive}
        ></RecipeListItem>
      );
    })}
  </>
);

export default RecipeList;
