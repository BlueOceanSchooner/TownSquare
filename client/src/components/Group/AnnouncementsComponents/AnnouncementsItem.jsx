import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

const AnnouncementsItem = ({ post }) => {

  return (
    <ListGroupItem className="group-post-item" >
      <Container>
        <Col>{post.author.first_name}{post.author.last_name}</Col>
        <Col>{post.created_at}</Col>
        <Col>{post.body}</Col>
      </Container>
    </ListGroupItem>
  )
}

export default AnnouncementsItem;
