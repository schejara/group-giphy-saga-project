import React from "react";
import Search from "../Search/Search";
import Favorite from "../Favorite/Favorite";
import { HashRouter as Router, Route } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <div>
      <Router>
        <Route path='/' exact>
      <Search/>
      </Route>
      <Route path='/favorites'>
      <Favorite/>
      </Route>
      
      </Router>
    </div>
  );
}


export default App;
