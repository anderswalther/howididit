import React from "react";
import { getRecipe, saveRecipe } from "../../api/recipeApi";
import { getTags } from "../../api/tagsApi";
import Spinner from "../common/Spinner";
import RecipeForm from "./RecipeForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tagActions from "../../redux/actions/tagActions";
import { bindActionCreators } from "redux";
import RecipeView from "./RecipeView";

const newCourse = {
  id: null,
  title: "newRecipe",
  content: "newRecipeContent",
  authorId: null,
  category: "",
  tags: []
};

class RecipeAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: newCourse,
      tags: [],
      apiCallsInProgress: 0,
      isSaving: false
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.onValueChangeHandler = this.onValueChangeHandler.bind(this);
    this.onTagsValueChangedHandler = this.onTagsValueChangedHandler.bind(this);
  }

  componentDidMount() {
    const { tags, actions } = this.props;

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
  }

  onValueChangeHandler(event) {
    const { name, value } = event.target;
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
      this.props.history.push("/recipes/");
    });
  }

  render() {
    return this.state.apiCallsInProgress > 0 ? (
      <Spinner />
    ) : (
      <>
        <ContentHeader subTitle={this.state.recipe.title} />
        <RecipeForm
          recipe={this.state.recipe}
          tags={this.props.tags}
          isSaving={this.state.isSaving}
          submitHandler={this.submitHandler}
          onValueChange={this.onValueChangeHandler}
          onTagsValueChange={this.onTagsValueChangedHandler}
        ></RecipeForm>
        <h3>Preview</h3>

        <RecipeView content={this.state.recipe.content}></RecipeView>
      </>
    );
  }
}

RecipeAdminPage.propTypes = {
  tags: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    tags: state.tags
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTags: bindActionCreators(tagActions.loadTags, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RecipeAdminPage);
