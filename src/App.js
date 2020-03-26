import React from "react";
import MainContent from "./components/recipes/RecipeListPage";
import RecipeAdminPage from "./components/recipes/RecipeAdminPage";
import RecipePage from "./components/recipes/RecipePage";
import { Route, Switch } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";

function App() {
  return (
    <div className="layout">
      <SideBar />
      <div className="content-wrapper">
        <div className="content">
          <Switch>
            <Route path="/admin/recipe/:id" component={RecipeAdminPage} />
            <Route path="/recipe/:id" component={RecipePage} />
            <Route path="/recipe" component={RecipePage} />
            <Route component={MainContent} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
