import React from "react";
import PropTypes from "prop-types";

export default function Authors(props) {
  return (
    <>
      <nav className="nav">
        <ul className="nav-list">
          <h1>AUTHORS</h1>
          {props.authors.map(author => {
            return (
              <li className="nav-item" key={author.id}>
                <a className="pure-button" href="/recipes/">
                  {author.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

Authors.propTypes = {
  authors: PropTypes.array.isRequired
};
