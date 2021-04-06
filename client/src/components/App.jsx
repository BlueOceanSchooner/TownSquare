import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Header from './Header/Header.jsx'
import { Button } from 'reactstrap';
import Chat from './Chat/Chat.jsx';
import Homepage from './homepage/Homepage.jsx';
import ExploreGroups from './ExploreGroups/ExploreGroups.jsx';

const App = () => {
  let userID = 1;
  return (
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
          <Homepage />
        </Route>
        <Route path="/groups/:id">
          <h1>Group Page</h1>
        </Route>
        <Route path="/signup">
          <h1>Sign Up</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
