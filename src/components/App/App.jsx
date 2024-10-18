import React from "react";
import Search from "../Search/Search";
import Favorite from "../Favorite/Favorite";


function App() {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <Router>
        <Route>
      <Search/>
      </Route>
      <Route>
      <Favorite/>
      </Route>
      
      </Router>
    </div>
  );
}


export default App;
