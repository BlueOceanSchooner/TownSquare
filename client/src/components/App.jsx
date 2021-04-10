import React from 'react';
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
import LoginPage from './Auth/LoginPage.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatModal: false,
      chatMemberID: 0,
      isLoginOpen: false,
      currentUser: {
        user_id: 0,
        first_name: '',
        last_name: '',
        email: '',
        oauth_provider: 'local'
      },
      loggedIn: false
    }
    this.chatOnClick = this.chatOnClick.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    axios.get('/api/login')
    .then(data => {
      this.setState({
        currentUser: {
          user_id: data.data.user_id,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          email: data.data.email,
        },
        loggedIn: true
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        currentUser: {
          user_id: 0,
          first_name: '',
          last_name: '',
          email: '',
        },
        loggedIn: false
      })
    })
  }

  toggleLogin() {
    this.setState({
      isLoginOpen: !this.state.isLoginOpen
    });
  };

  handleLogout() {
    axios.get('/api/logout')
    .then(data => {
      this.setState({
        currentUser: {
          user_id: 0,
          first_name: '',
          last_name: '',
          email: '',
        },
        loggedIn: false
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

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
          <Header
            userID={userID}
            isLoginOpen={this.state.isLoginOpen}
            toggleLogin={this.toggleLogin}
            loggedIn={this.state.loggedIn}
            currentUser={this.state.currentUser}
            handleLogout={this.handleLogout}/>
          <Chat userID={this.state.loggedIn ? this.state.currentUser.user_id : null} onClick={this.chatOnClick} modal={this.state.chatModal} chatMemberID={this.state.chatMemberID}/>
        </div>
        <Switch>
          <Route exact path="/">
            <Homepage userID={userID} chatOnClick={this.chatOnClick} />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/allgroups">
            <ExploreGroups />
          </Route>
          <Route exact path="/groups/:id" render={(props) => {
            // pass this group_id into your component to know which group the user is attempting to view
            const group_id = props.match.params.id;
            // replace <h1> tags with your component
            return (
              // <GroupPage groupId={group_id} userId={userID}/>
              <GroupPage groupId={group_id} currentUser={this.state.currentUser} memberOnClick={this.chatOnClick}/>
            );
          }} />
          <Route path="/signup">
            <Signup toggleLogin={this.toggleLogin}/>
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
