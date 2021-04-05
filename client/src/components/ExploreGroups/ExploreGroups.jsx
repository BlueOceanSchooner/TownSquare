import React from 'react';
import { Jumbotron, Button, ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap';
import Header from '../Header/Header.jsx'
import axios from 'axios';

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
      groups: null
    }
  }

  componentDidMount() {
    axios.get('/api/groups')
      .then((results) => {
        console.log(results);
        this.setState({
          groups: results.data
        })
      })
  }





  render() {
    if (!this.state.groups) {
      return <div>loading...</div>
    } else {
      return (
        <div>
          <br></br><br></br>
          <div style={divstyles} className='groups-area'>
            <Jumbotron style={jumbostyles} fluid>
              <h2 className='display-6'>Groups In Your Area</h2>
            </Jumbotron>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div>
            <ListGroup flush>
              {this.state.groups.map((group, i) => {
                return (
                  <ListGroupItem key={i}>
                  <ListGroupItemHeading >{group.group_name}</ListGroupItemHeading>
                  <ListGroupItemText>{group.description}</ListGroupItemText>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </div>
        </div>
      )

    }

  }
};

export default ExploreGroups;
