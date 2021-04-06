import React from 'react';
import EventsItem from './EventsItem';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [1, 2, 3, 4, 5],
    }
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.array.map((item) => (
            <EventsItem key={item}/>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default EventsList;
