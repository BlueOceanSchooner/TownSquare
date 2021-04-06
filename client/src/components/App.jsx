import React from 'react';
<<<<<<< HEAD
import Login from './Auth/Login.jsx';
import Signup from './Auth/Signup.jsx';
=======
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Header from './Header/Header.jsx'
>>>>>>> master
import { Button } from 'reactstrap';
import Chat from './Chat/Chat.jsx';
import ExploreGroups from './ExploreGroups/ExploreGroups.jsx';

const App = () => {
  let userID = 1;
  return (
<<<<<<< HEAD
    <div>
    </div>
=======
    <Router>
      <div>
        <Header />
        <Chat userID={userID}/>
      </div>
      <Switch>
        <Route path="/allgroups">
          <ExploreGroups />
        </Route>
        <Route exact path="/">
          <h1>Home Page</h1>
        </Route>
        <Route path="/groups/:id">
          <h1>Group Page</h1>
        </Route>
        <Route path="/signup">
          <h1>Sign Up</h1>
        </Route>
      </Switch>
    </Router>
>>>>>>> master
  );
};

export default App;
