import React from "react";
import Spinner from "../common/Spinner";
import RecipeDetails from "./views/Details";
import RecipeEditPage from "./RecipeEditPage";
import RecipeList from "./views/List";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tagActions from "../../redux/actions/tagActions";
import * as authorActions from "../../redux/actions/authorActions";
import * as recipeActions from "../../redux/actions/recipeActions";
import { bindActionCreators } from "redux";

const recipeTemplate = {
  id: -1,
  title: "defaultTitle",
  content: "defaultContent",
  authorId: null,
  category: "",
  tags: []
};

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRecipe: recipeTemplate
    };
    this.contentUpdated = this.contentUpdated.bind(this);
  }

  componentDidMount() {
    console.log("component did mount");
    const { actions, recipes, tags, authors } = this.props;
    if (recipes.length === 0) {
      actions.loadRecipes();
    }
    if (tags.length === 0) {
      actions.loadTags();
    }
    if (authors.length === 0) {
      actions.loadAuthors();
    }

    console.log(recipes.length, tags.length, authors.length);
  }

  componentWillReceiveProps(nextProps) {
    const { recipes, tags, authors } = nextProps;
    if (recipes.length > 0 && tags.length > 0 && authors.length > 0) {
      let recipeToShow = recipes[0];
      console.log(nextProps.match.params.show);
      if (nextProps.match.params.id) {
        recipeToShow = recipes.find(
          recipe => recipe.id === nextProps.match.params.id
        );
      }
      this.setState({ currentRecipe: recipeToShow });
    }
  }

  contentUpdated(updatedRecipe) {
    this.props.actions.loadRecipes();
    this.props.history.push("/recipes/" + updatedRecipe.id);
  }

  render() {
    const isInEditMode = this.props.location.pathname.includes("edit");

    let recipeViewToShow;
    if (isInEditMode) {
      recipeViewToShow = (
        <RecipeEditPage
          recipe={this.state.currentRecipe}
          tags={this.props.tags}
          contentUpdatedCallback={this.contentUpdated}
        ></RecipeEditPage>
      );
    } else {
      recipeViewToShow = (
        <RecipeDetails recipe={this.state.currentRecipe}></RecipeDetails>
      );
    }

    return this.props.apiCallsInProgress > 0 ? (
      <Spinner />
    ) : (
      <>
        <div className="main-content">
          <div className="main-content-view">
            <RecipeList
              recipes={this.props.recipes}
              activeRecipeId={this.state.currentRecipe.id}
            ></RecipeList>
          </div>
        </div>

        <div className="side-content">{recipeViewToShow}</div>
      </>
    );
  }
}

RecipePage.propTypes = {
  actions: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  apiCallsInProgress: PropTypes.number.isRequired
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
      authorName: getAuthorNameFromId(recipe.authorId, state.authors),
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
    recipes: recipesWithAuthersAndTags,
    tags: state.tags,
    authors: state.authors,
    apiCallsInProgress: state.apiCallsInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadRecipes: bindActionCreators(recipeActions.loadRecipes, dispatch),
      loadTags: bindActionCreators(tagActions.loadTags, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
