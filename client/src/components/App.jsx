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

const App = () => {
  let userID = 1;
  return (
    <div>
      <Header />
      <h1>Town Square</h1>
      <Button color="danger">Danger!</Button>
      <Chat userID={userID}/>
    </div>
  );
};

export default App;
