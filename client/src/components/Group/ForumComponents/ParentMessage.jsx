import React, { useState } from 'react';
import axios from 'axios';
import ChildMessage from './ChildMessage';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col, Collapse, Form, FormGroup, Label, Input
} from 'reactstrap';
import moment from 'moment';

const ParentMessage = ({ thread, groupId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [childMessage, setChildMessage] = useState('');
  const date = moment(thread.parent.posted).format("MMMM Do h:mm a");

  const toggle = () => setIsOpen(!isOpen);

  const addChildPost = function () {
    event.preventDefault();
    axios.post(`/api/groups/${thread.parent.group_id}/forum-reply`, {
      "group_id": groupId,
      "user_id": userId,
      "forum_post_id": `${thread.parent.forum_post_id}`,
      "message": childMessage,
    });
  }

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
                <Button color="primary" onClick={toggle}>Reply</Button>
              </CardBody>
            </Card>
            <Collapse isOpen={isOpen}>
              <Form>
                <FormGroup className="forum-reply-area">
                  <Input type="textarea" name="text" placeholder="Reply.." onChange={(e) => {setChildMessage(e.target.value)}} />
                </FormGroup>
                {/* adding a child forum post */}
                <Button onClick={addChildPost}>Send</Button>
              </Form>
            </Collapse>
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
