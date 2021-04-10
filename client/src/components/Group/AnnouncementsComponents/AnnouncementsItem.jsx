import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';
import moment from 'moment';

const AnnouncementsItem = ({ post }) => {
  const date = moment(post.created_at).format("MMMM Do h:mm a");

  return (
    <div className="group-announcement-item-container">
      <Container className="group-post-item">
        <Card>
          <CardBody className="announcement-card-body">
            <div className="announcement-card-headers-container">
              <CardTitle tag="h5" className="group-post-title">{post.title}</CardTitle>
              <div className="announcement-card-header-section">
                <CardSubtitle className="announcement-card-name-subtitle">{post.author.first_name} {post.author.last_name}</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{date}</CardSubtitle>
              </div>
            </div>
            <CardText className="announcement-card-body-text">{post.body}</CardText>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default AnnouncementsItem;
