import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Party from "./components/Party";
import Voters from "./components/Voters";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Party">
            <Party />
          </Route>

          <Route path="/Voters">
            <Voters />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
