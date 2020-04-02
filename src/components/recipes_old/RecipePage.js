import React from "react";
import { getRecipe, saveRecipe } from "../../api/recipeApi";
import { getTags } from "../../api/tagsApi";
import Spinner from "../common/Spinner";
import RecipePageView from "./RecipePageView";

const newCourse = {
  id: null,
  title: "newRecipe",
  content: "newRecipeContent",
  authorId: null,
  category: "",
  tags: []
};

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: newCourse,
      tags: [],
      apiCallsInProgress: 0,
      isSaving: false
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      console.log("loading recipe");
      this.setState({ apiCallsInProgress: this.state.apiCallsInProgress + 1 });
      getRecipe(this.props.match.params.id).then(recipe => {
        this.setState({ recipe: recipe });
        console.log(recipe.tags);
        this.setState({
          apiCallsInProgress: this.state.apiCallsInProgress - 1
        });
      });
    }

    this.setState({ apiCallsInProgress: this.state.apiCallsInProgress + 1 });
    getTags().then(tags => {
      this.setState({ apiCallsInProgress: this.state.apiCallsInProgress - 1 });
      this.setState({ tags: tags });
    });
  }

  render() {
    return this.state.apiCallsInProgress > 0 ? (
      <Spinner />
    ) : (
      <>
        <ContentHeader subTitle={this.state.recipe.title} />
        <RecipePageView recipe={this.state.recipe}></RecipePageView>
      </>
    );
  }
}

export default RecipePage;
