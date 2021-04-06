import React from 'react';
import { ListGroupItem } from 'reactstrap';

const EventsItem = () => {
  return (
    <div>
      <ListGroup>
        <ListGroupItem>Weekend Run</ListGroupItem>
        <ListGroupItem>Wild Wednesday</ListGroupItem>
        <ListGroupItem>Easter Exploration</ListGroupItem>
        <ListGroupItem>Group Hike</ListGroupItem>
      </ListGroup>
    </div>
  )
}

export default EventsItem;
