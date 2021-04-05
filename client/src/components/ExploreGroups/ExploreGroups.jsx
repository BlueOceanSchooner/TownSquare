import React from 'react';
import { Jumbotron, Button, ListGroup, ListGroupItem } from 'reactstrap';
import Header from './Header/Header.jsx'

class ExploreGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }





  render() {

    return (
      <div>
        <Header />
        <div className="groups-area">Groups In Your Area

        </div>
      </div>
    )

  }
};

export default ExploreGroups;
