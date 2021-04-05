import React from 'react';
import { Button } from 'reactstrap';
import Header from './Header/Header.jsx'

const App = () => {
  return (
    <div>
      <Header />
      <h1>Town Square</h1>
      <Button color="danger">Danger!</Button>
    </div>
  );
};

export default App;
