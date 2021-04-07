import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';
import moment from 'moment';

const AnnouncementsItem = ({ post }) => {
  const date = moment(post.created_at).format("MMMM Do h:mm a");

  return (
    <ListGroupItem className="group-post-item" >
      <Container>
        <Card>
          <CardBody>
            <div className="announcement-card-header-section">
              <CardTitle tag="h5" className="group-post-title">{post.author.first_name} {post.author.last_name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">{date}</CardSubtitle>
            </div>
            <CardText>{post.body}</CardText>
          </CardBody>
        </Card>
      </Container>
    </ListGroupItem>
  )
}

export default AnnouncementsItem;
