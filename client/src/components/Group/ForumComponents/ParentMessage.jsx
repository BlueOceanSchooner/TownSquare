import React from 'react';
import ChildMessage from './ChildMessage';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';
import moment from 'moment';

const ParentMessage = ({ thread }) => {
  const date = moment(thread.parent.posted).format("MMMM Do h:mm a");

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card className="forum-parent-card">
              <CardBody>
                <div className="forum-card-header-section">
                  <CardTitle tag="h5" className="forum-card-title">{thread.parent.author.first_name} {thread.parent.author.last_name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{date}</CardSubtitle>
                </div>
                <CardText>{thread.parent.message}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {thread.children.map((child) => (
          <ChildMessage key={child.reply_id} child={child} />
        ))}
      </Container>
    </div>
  )
}

export default ParentMessage;
