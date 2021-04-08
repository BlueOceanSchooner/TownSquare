import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';
import moment from 'moment';

const ChildMessage = ({ child }) => {
  const date = moment(child.posted).format("MMMM Do h:mm a");

  return (
    <div>
      <Row>
        <Col xs="1"></Col>
        <Col xd="11">
          <Card className="forum-child-card">
            <CardBody>
              <div className="forum-card-header-section">
                <CardTitle className="forum-card-title">{child.author.first_name} {child.author.last_name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{date}</CardSubtitle>
              </div>
              <CardText>{child.message}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChildMessage;
