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
import MessageMember from './Members/MessageMember.jsx';
import GroupPage from './Group/GroupPage';
import Homepage from './homepage/Homepage.jsx';
import ExploreGroups from './ExploreGroups/ExploreGroups.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatModal: false,
      chatMemberID: null,
      isLoginOpen: false
    }
    this.chatOnClick = this.chatOnClick.bind(this);
  }

  toggleLogin() {
    this.setState({
      isLoginOpen: !this.state.isLoginOpen
    });
  };

  chatOnClick(chatMember) {
    const { chatModal } = this.state;
    this.setState({ chatModal: !chatModal });
    if (chatModal) {
      this.setState({ chatMemberID: null })
    } else if (chatMember) {
      this.setState({ chatMemberID: chatMember.target.getAttribute('name') })
    }
  }

  render() {
    let userID = 1;
    return (
      <Router>
        <div>
          <Header userID={userID} isLoginOpen={this.state.isLoginOpen} toggleLogin={this.toggleLogin.bind(this)}/>
          <Chat userID={userID} onClick={this.chatOnClick} modal={this.state.chatModal} chatMemberID={this.state.chatMemberID}/>

          {/* Example use of MessageMember component */}
          {/* <MessageMember name={"Jane Waterson"} id={8} onClick={this.chatOnClick}/> */}

        </div>
        <Switch>
          <Route exact path="/">
            <Homepage userID={userID} chatOnClick={this.chatOnClick} />
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
            <Signup />
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
