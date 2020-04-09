import React from "react";
import SearchContent from "./views/Content";
import { searchRecipes } from "../../api/recipeApi";
import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const inputRef = React.createRef();

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onClickSuggestion = this.onClickSuggestion.bind(this);
    this.state = { value: "", suggestions: [], showSuggestions: false };
  }

  componentDidMount() {
    document.addEventListener("click", this.onClickOutside);
  }

  onClickOutside(e) {
    if (!inputRef.current.contains(e.target)) {
      this.setState({ showSuggestions: false });
    }
  }

  onClick(event) {
    this.setState({ showSuggestions: true });
  }

  onClickSuggestion(id) {
    this.setState({ showSuggestions: false });
    this.props.history.push("/recipes/" + id);
  }

  onChange(event) {
    let queryString = event.target.value;
    this.setState({ value: queryString });

    if (queryString.length > 2) {
      searchRecipes(queryString).then(recipes => {
        const searchSuggestions = recipes.map(recipe => {
          const tags = this.props.tags.filter(tag =>
            recipe.tags.includes(tag.id)
          );
          return { id: recipe.id, title: recipe.title, tags: tags };
        });

        this.setState({ suggestions: searchSuggestions });
      });
    } else {
      this.setState({ suggestions: [] });
    }
  }

  render() {
    return (
      <div ref={inputRef}>
        <SearchContent
          value={this.state.value}
          suggestions={this.state.suggestions}
          tags={this.props.tags}
          showSuggestions={this.state.showSuggestions}
          onChange={this.onChange}
          onClick={this.onClick}
          onClickSuggestion={this.onClickSuggestion}
        ></SearchContent>
      </div>
    );
  }
}

Search.propTypes = {
  tags: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    tags: state.tags
  };
}

export default connect(mapStateToProps)(withRouter(Search));
