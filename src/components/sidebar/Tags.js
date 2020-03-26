import React from "react";
import PropTypes from "prop-types";

export default function Tags(props) {
  return (
    <>
      <nav className="nav">
        <ul className="nav-list">
          <h1>Tags</h1>
          {props.tags.map(tag => {
            return (
              <li className="nav-item" key={tag.id}>
                <a className="" href="/recipes/">
                  {tag.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired
};
