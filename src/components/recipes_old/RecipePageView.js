import React from "react";
import { Link } from "react-router-dom";
import RecipeView from "./RecipeView";

class RecipePageView extends React.Component {
  render() {
    return (
      <article key={this.props.recipe.id} className="page-content">
        <div className="content-actions">
          <button className="btn">
            <Link to={"/recipes"}>Back</Link>
          </button>
        </div>
        <RecipeView content={this.props.recipe.content}></RecipeView>
      </article>
    );
  }
}

export default RecipePageView;
