import React, { useEffect } from "react";
import RecipeListView from "./RecipeListView";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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

RecipeListPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function getAuthorNameFromId(authorId, allAuthors) {
  return allAuthors.find(author => author.id === authorId).name;
}

function getIncludedTagObjects(recipeTagIds, allTags) {
  return allTags.filter(tag => recipeTagIds.includes(tag.id));
}

function getRecipesWithAuthorsAndTagsFromState(state) {
  if (state.authors.length === 0) {
    return [];
  }
  return state.recipes.map(recipe => {
    return {
      ...recipe,
      authorName: getAuthorNameFromId(recipe.id, state.authors),
      tags: getIncludedTagObjects(recipe.tags, state.tags)
    };
  });
}

function mapStateToProps(state) {
  let recipesWithAuthersAndTags = [];
  if (state.authors.length > 0 && state.tags.length > 0) {
    recipesWithAuthersAndTags = getRecipesWithAuthorsAndTagsFromState(state);
  }
  return {
    recipes: recipesWithAuthersAndTags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadRecipes: bindActionCreators(recipeActions.loadRecipes, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListPage);
