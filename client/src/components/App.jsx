import React from 'react';
import { Button } from 'reactstrap';
import Chat from './Chat/Chat.jsx';
import GroupMain from './GroupPage/Main';

const App = () => {
  let userID = 1;
  return (
    <div>
      <h1>Town Square</h1>
      {/* <Button color="danger">Danger!</Button> */}
      <GroupMain />
      <Chat userID={userID}/>
    </div>
  );
};

export default App;
