import React, { useEffect, useState } from "react";
import RecipeListView from "./RecipeListView";
import { getRecipes } from "../../api/recipeApi";
import ContentHeader from "../common/PageHeader";

function MainContent() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (recipes.length === 0) {
      getRecipes().then(recipes => {
        setRecipes(recipes);
      });
    }
  });

  return (
    <>
      <ContentHeader title="Recipes" subTitle="recent posts" />
      <RecipeListView recipes={recipes} />
    </>
  );
}

export default MainContent;
