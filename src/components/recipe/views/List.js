import React from "react";
import { Link } from "react-router-dom";
import RecipeListItem from "./ListItem";

const RecipeList = ({ recipes }) => (
  <>
    <div className="content-actions">
      <button className="btn">
        <Link to={"/recipe"}>Add</Link>
      </button>
    </div>
    {recipes.map(recipe => {
      return <RecipeListItem recipe={recipe} key={recipe.id}></RecipeListItem>;
    })}
  </>
);

export default RecipeList;
