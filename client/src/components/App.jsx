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
import MessageMember from './Members/MessageMember.jsx';
import GroupPage from './Group/GroupPage';
import Homepage from './homepage/Homepage.jsx';
import ExploreGroups from './ExploreGroups/ExploreGroups.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatModal: false,
      chatMemberID: null
    }
    this.chatOnClick = this.chatOnClick.bind(this);
  }

  chatOnClick(chatMember) {
    if (chatMember) {
      this.setState({ chatMemberID: chatMember.target.getAttribute('name') })
    }
    const { chatModal } = this.state;
    this.setState({ chatModal: !chatModal });
    if (chatModal) {
      this.setState({ chatMemberID: null })
    }
  }

  render() {
    let userID = 1;
    return (
      <Router>
        <div>
          <Header />
          <Chat userID={userID} onClick={this.chatOnClick} modal={this.state.chatModal} chatMemberID={this.state.chatMemberID}/>
          <MessageMember name={"Jane Waterson"} id={8} onClick={this.chatOnClick}/>
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
            <h1>Sign Up</h1>
          </Route>

          <Route path="*">
            <h1>Address does not match any routes!</h1>
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;
