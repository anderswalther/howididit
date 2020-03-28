import React from "react";
import hljs from "highlight.js";
import { Link } from "react-router-dom";
import "highlight.js/styles/ocean.css";
import * as blocks from "../common/Editor";

class RecipeListView extends React.Component {
  constructor(props) {
    super(props);
    this.parseBlocks = this.parseBlocks.bind(this);
  }
  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  parseBlocks(originalText) {
    return originalText
      .replace(blocks.CODE_BLOCK.start, blocks.CODE_BLOCK.actualStart)
      .replace(blocks.CODE_BLOCK.end, blocks.CODE_BLOCK.actualEnd)
      .replace(blocks.BOLD_BLOCK.start, blocks.BOLD_BLOCK.actualStart)
      .replace(blocks.BOLD_BLOCK.end, blocks.BOLD_BLOCK.actualEnd);
  }

  updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  render() {
    return (
      <article key={this.props.recipe.id} className="page-content">
        <div className="content-actions">
          <button className="btn">
            <Link to={"/recipes"}>Back</Link>
          </button>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: this.parseBlocks(this.props.recipe.content)
          }}
        />
      </article>
    );
  }
}

export default RecipeListView;
