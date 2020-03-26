import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

class RecipeListView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  render() {
    return (
      <article key={this.props.recipe.id} className="page-content">
        <p className="recipe-meta">
          By{" "}
          <a className="recipe-author" href="#">
            Eric Ferraiuolo
          </a>{" "}
          under{" "}
          <a className="recipe-category" href="#">
            JavaScript
          </a>
        </p>

        <div dangerouslySetInnerHTML={{ __html: this.props.recipe.content }} />
      </article>
    );
  }
}

export default RecipeListView;
