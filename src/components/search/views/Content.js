import React from "react";
import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const highlightQuery = (entireString, query) => {
  const n = entireString.toUpperCase();
  const q = query.toUpperCase();
  const indexOfQuery = n.indexOf(q);
  if (!q || indexOfQuery === -1) {
    return entireString;
  }
  const l = q.length;
  return (
    entireString.substr(0, indexOfQuery) +
    "<b>" +
    entireString.substr(indexOfQuery, l) +
    "</b>" +
    entireString.substr(indexOfQuery + l)
  );
};

const SearchContent = ({
  value,
  suggestions,
  showSuggestions,
  tags,
  onChange,
  onClick,
  onClickSuggestion
}) => {
  let suggestionSection;
  if (showSuggestions) {
    suggestionSection = (
      <div className="search-sugggestions ">
        {suggestions.map(suggestion => {
          return (
            <div
              onClick={() => onClickSuggestion(suggestion.id)}
              key={suggestion.id}
            >
              <span
                className="suggestion-title"
                dangerouslySetInnerHTML={{
                  __html: highlightQuery(suggestion.title, value)
                }}
              ></span>
              {suggestion.tags.map(tag => (
                <a
                  key={tag.id}
                  className="suggestion-tag pure-button button-xsmall tag"
                >
                  {tag.label}
                </a>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="input-icon" />
        <input
          name="searc-input"
          className="search-input   "
          type="text"
          value={value}
          placeholder="Search for"
          onChange={onChange}
          onClick={onClick}
        />
        {suggestionSection}
      </div>
    </>
  );
};

export default SearchContent;
