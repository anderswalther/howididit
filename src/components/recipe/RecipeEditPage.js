import React from "react";
import RecipeForm from "./views/Form";
import PropTypes from "prop-types";
import { saveRecipe } from "../../api/recipeApi";
import RecipeDetails from "./views/Details";
import ViewSelector from "./views/ViewSelector";

const recipeTemplate = {
  id: -1,
  title: "defaultTitle",
  content: "defaultContent",
  authorId: null,
  category: "",
  tags: []
};

class RecipeEditPage extends React.Component {
  constructor(props) {
    super(props);
    let recipeFromProps = props.recipe;
    recipeFromProps.tags = recipeFromProps.tags.map(tag => tag.id);
    this.state = {
      recipe: recipeFromProps,
      currentView: "edit",
      isSaving: false
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.onValueChangeHandler = this.onValueChangeHandler.bind(this);
    this.onTagsValueChangedHandler = this.onTagsValueChangedHandler.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  onValueChangeHandler(event) {
    const { name, value } = event.target;
    console.log("event changed : ", name, value);
    const updatedRecipe = { ...this.state.recipe, [name]: value };
    this.setState({ recipe: updatedRecipe });
    console.log(JSON.stringify(this.state.recipe));
  }

  onTagsValueChangedHandler(selectedTagsArray) {
    const selectedTags = selectedTagsArray.map(tag => tag.value);
    this.onValueChangeHandler({
      target: { name: "tags", value: selectedTags }
    });
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({ isSaving: true });
    saveRecipe(this.state.recipe).then(() => {
      this.props.contentUpdatedCallback(this.state.recipe);
    });
  }

  changeView(value) {
    this.setState({ currentView: value });
  }

  render() {
    let viewToShow;
    console.log("in render : " + this.state.currentView.toLowerCase());
    if (this.state.currentView.toLowerCase() === "edit") {
      viewToShow = (
        <RecipeForm
          recipe={this.state.recipe}
          tags={this.props.tags}
          isSaving={this.state.isSaving}
          submitHandler={this.submitHandler}
          onValueChange={this.onValueChangeHandler}
          onTagsValueChange={this.onTagsValueChangedHandler}
        ></RecipeForm>
      );
    } else {
      viewToShow = <RecipeDetails recipe={this.state.recipe}></RecipeDetails>;
    }

    return (
      <>
        <ViewSelector
          firstValue={"Edit"}
          secondValue={"Preview"}
          selectedValue={this.state.currentView}
          onClickHandler={this.changeView}
        ></ViewSelector>

        {viewToShow}
      </>
    );
  }
}

RecipeEditPage.propTypes = {
  recipe: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  contentUpdatedCallback: PropTypes.func.isRequired
};

export default RecipeEditPage;
