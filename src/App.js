import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Imports
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route path="*">No</Route>
      </Switch>
    </Router>
  );
}

export default App;