import React, { useEffect } from "react";
import Authors from "./Authors";
import Tags from "./Tags";
import Category from "./Categories";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tagActions from "../../redux/actions/tagActions";
import * as authorActions from "../../redux/actions/authorActions";
import { bindActionCreators } from "redux";

const categories = [
  {
    id: "1",
    name: "Environment setup"
  },
  {
    id: "2",
    name: "Program language"
  },
  {
    id: "3",
    name: "Working habbits"
  }
];

const authors = [
  {
    id: "1",
    name: "Anders Walther"
  },
  {
    id: "2",
    name: "Anke Oberender"
  },
  {
    id: "3",
    name: "Ulrik Walther"
  }
];

function SideBar({ tags: tags, authors: authors, actions: actions }) {
  useEffect(() => {
    if (tags.length === 0) {
      actions.loadTags();
    }
    if (authors.length === 0) {
      actions.loadAuthors();
    }
  });
  return (
    <div className="sidebar">
      <Authors authors={authors} />
      <Tags tags={tags} />
      <Category categories={categories} />
    </div>
  );
}

SideBar.propTypes = {
  tags: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    tags: state.tags,
    authors: state.authors
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTags: bindActionCreators(tagActions.loadTags, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
