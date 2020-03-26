import React, { useEffect, useState } from "react";
import RecipeListView from "./RecipeListView";
import { getRecipes } from "../../api/recipeApi";
import ContentHeader from "../common/PageHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authorActions from "../../redux/actions/authorActions";
import * as recipeActions from "../../redux/actions/recipeActions";
import { bindActionCreators } from "redux";

function RecipeListPage({ recipes, actions }) {
  useEffect(() => {
    if (recipes.length === 0) {
      actions.loadRecipes();
    }
  });

  return (
    <>
      <ContentHeader title="Recipes" subTitle="recent posts" />
      <RecipeListView recipes={recipes} />
    </>
  );
}

function getRecipesWithAuthorsFromState(state) {
  if (state.authors.length === 0) {
    return [];
  }
  return state.recipes.map(recipe => {
    return {
      ...recipe,
      authorName: state.authors.find(author => author.id === recipe.authorId)
        .name
    };
  });
}

RecipeListPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  let recipesWithAuthors =
    state.authors.length === 0 ? [] : getRecipesWithAuthorsFromState(state);
  return {
    authors: state.authors,
    recipes: recipesWithAuthors
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadRecipes: bindActionCreators(recipeActions.loadRecipes, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListPage);
