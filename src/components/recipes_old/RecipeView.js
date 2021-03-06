import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night.css";
import commonmark from "commonmark";

import * as blocks from "../common/Editor";

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.parseBlocks = this.parseBlocks.bind(this);
    this.reader = new commonmark.Parser();
    this.writer = new commonmark.HtmlRenderer();
  }
  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  parseBlocks(originalText) {
    var parsed = this.reader.parse(originalText);
    return this.writer.render(parsed);
  }

  updateCodeSyntaxHighlighting = () => {
    let divsToHightlight = document.querySelectorAll("pre code");
    let spansToHightlight = document.querySelectorAll("p code");
    [...divsToHightlight, ...spansToHightlight].forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  render() {
    return (
      <div
        className="recipe-content"
        dangerouslySetInnerHTML={{
          __html: this.parseBlocks(this.props.content)
        }}
      />
    );
  }
}

export default RecipeView;
