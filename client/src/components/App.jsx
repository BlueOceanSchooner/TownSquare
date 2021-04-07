import React, {useState} from 'react';
import Signup from './Auth/Signup.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Header from './Header/Header.jsx'
import { Button } from 'reactstrap';
import Chat from './Chat/Chat.jsx';
import GroupPage from './Group/GroupPage';
import Homepage from './homepage/Homepage.jsx';
import ExploreGroups from './ExploreGroups/ExploreGroups.jsx';

const App = () => {
  let userID = 1;
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };
  return (
    <Router>
      <div>
        <Header isLoginOpen={isLoginOpen} toggleLogin={toggleLogin}/>
        <Chat userID={userID}/>
      </div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/allgroups">
          <ExploreGroups />
        </Route>
        <Route exact path="/groups/:id" render={(props) => {
          // pass this group_id into your component to know which group the user is attempting to view
          const group_id = props.match.params.id;
          // replace <h1> tags with your component
          return (
            <GroupPage groupId={group_id} />
          );
        }} />
        <Route path="/signup">
          <Signup toggleLogin={toggleLogin} />
        </Route>

        <Route path="*">
          <h1>Address does not match any routes!</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
