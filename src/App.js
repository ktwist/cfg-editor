import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Editor from './pages/Editor';
import ConfigList from './pages/ConfigList';
import Logout from './pages/Logout';
import './App.css';

function App() {
  return (
    <div className="App-wrapper">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* <Route path="/editor/:cfg-name" children={<Editor />} /> */}
          <Route path="/config-list" >
            <ConfigList />
          </Route>
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/" component={Login} />
          {/* <Route path="*">No</Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;