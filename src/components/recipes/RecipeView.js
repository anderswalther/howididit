import React from "react";
import hljs from "highlight.js";
//import "highlight.js/styles/github.css";
import "highlight.js/styles/tomorrow-night.css";

import * as blocks from "../common/Editor";

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.parseBlocks = this.parseBlocks.bind(this);
  }
  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  parseBlocks(originalText) {
    return (
      "<pre>" +
      originalText
        .split(blocks.CODE_BLOCK.start)
        .join(blocks.CODE_BLOCK.actualStart)
        .split(blocks.CODE_BLOCK.end)
        .join(blocks.CODE_BLOCK.actualEnd)
        .split(blocks.CODE_INLINE.start)
        .join(blocks.CODE_INLINE.actualStart)
        .split(blocks.CODE_INLINE.end)
        .join(blocks.CODE_INLINE.actualEnd)
        .split(blocks.BOLD_BLOCK.start)
        .join(blocks.BOLD_BLOCK.actualStart)
        .split(blocks.BOLD_BLOCK.end)
        .join(blocks.BOLD_BLOCK.actualEnd) +
      "</pre>"
    );
  }

  updateCodeSyntaxHighlighting = () => {
    let divsToHightlight = document.querySelectorAll("div.highlight");
    let spansToHightlight = document.querySelectorAll("span.highlight");
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
