import React from 'react';
import { Jumbotron, Button, ListGroup, ListGroupItem } from 'reactstrap';
import Header from '../Header/Header.jsx'

class ExploreGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }





  render() {

    return (
      <div>
        <div className="groups-area">
          <br></br><br></br>
          <Jumbotron>
            <h2 className="display-6">Groups In Your Area</h2>

          </Jumbotron>

        </div>
      </div>
    )

  }
};

export default ExploreGroups;
