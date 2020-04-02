import React from "react";
import RecipeListPage from "./components/recipe/RecipeListPage";
//import RecipeAdminPage from "./components/recipe/RecipeAdminPage";
import { Route, Switch } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header></Header>
      <div className="page-content">
        <Switch>
          <Route path="/recipes/:id" component={RecipeListPage} />
          <Route path="/recipes" component={RecipeListPage} />
          <Route path="/" component={RecipeListPage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
