import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

const ChildMessage = ({ child }) => {

  return (
    <div>
      <Row>
        <Col xs="1"></Col>
        <Col xd="11">{child.message}</Col>
      </Row>
    </div>
  )
}

export default ChildMessage;
