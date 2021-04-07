import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

const AnnouncementsItem = ({ post }) => {

  return (
    <ListGroupItem className="group-post-item" >
      <Container>
        <Card>
          <CardBody>
            <CardTitle tag="h5" className="group-post-title">{post.author.first_name} {post.author.last_name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">{post.created_at}</CardSubtitle>
            <CardText>{post.body}</CardText>
          </CardBody>
        </Card>
      </Container>
    </ListGroupItem>
  )
}

export default AnnouncementsItem;
