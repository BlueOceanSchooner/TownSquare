import React from 'react';
import ChildMessage from './ChildMessage';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

const ParentMessage = ({ thread }) => {

  return (
    <div>
      <ListGroupItem>
        <Container>
          <Row>
            <Col>
              {thread.parent.author.first_name} {thread.parent.author.last_name}
              {thread.parent.message}
            </Col>
          </Row>
          {thread.children.map((child) => (
            <ChildMessage key={child.reply_id} child={child} />
          ))}
        </Container>
      </ListGroupItem>
    </div>
  )
}

export default ParentMessage;
