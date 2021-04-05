import React from 'react';
import { Button } from 'reactstrap';
import Chat from './Chat/Chat.jsx';

const App = () => {
  let userID = 1;
  return (
    <div>
      <h1>Town Square</h1>
      <Button color="danger">Danger!</Button>
      <Chat userID={userID}/>
    </div>
  );
};

export default App;
