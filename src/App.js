import React from "react";
import RecipePage from "./components/recipe/RecipePage";
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
          <Route path="/recipes/:id" component={RecipePage} />
          <Route path="/recipes/:id/edit" component={RecipePage} />
          <Route path="/recipes/create" component={RecipePage} />
          <Route path="/recipes" component={RecipePage} />
          <Route path="/" component={RecipePage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
