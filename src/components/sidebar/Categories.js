import React from "react";
import PropTypes from "prop-types";

export default function Categories(props) {
  return (
    <>
      <nav className="nav">
        <ul className="nav-list">
          <h1>Categories</h1>
          {props.categories.map(category => {
            return (
              <li className="nav-item" key={category.id}>
                <a className="pure-button" href="/recipes/">
                  {category.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};
