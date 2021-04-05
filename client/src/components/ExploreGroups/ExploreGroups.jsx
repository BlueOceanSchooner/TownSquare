import React from 'react';
import { Jumbotron, Button, ListGroup, ListGroupItem } from 'reactstrap';
import Header from '../Header/Header.jsx'

const jumbostyles = {
  width: '80%',
  display: 'flex',
  justifyContent: 'center',
  justifySelf: "center"
}

const divstyles = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  height: '80px'
}

class ExploreGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }





  render() {

    return (
      <div>
        <br></br><br></br>
        <div style={divstyles} className='groups-area'>
          <Jumbotron style={jumbostyles} fluid>
            <h2 className='display-6'>Groups In Your Area</h2>
          </Jumbotron>
          <ListGroup>

          </ListGroup>

        </div>
      </div>
    )

  }
};

export default ExploreGroups;
