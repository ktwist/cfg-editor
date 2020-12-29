import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Imports
import Login from './pages/Login';
import Register from './pages/Register';
import Editor from './pages/Editor';
import './App.css';

function App() {
  return (
    <div className="App-wrapper">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/" component={Login} />
          <Route path="*">No</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;