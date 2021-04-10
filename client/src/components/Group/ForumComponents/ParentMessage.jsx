import React, { useState } from 'react';
import axios from 'axios';
import ChildMessage from './ChildMessage';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col, Collapse, Form, FormGroup, Label, Input
} from 'reactstrap';
import moment from 'moment';

class ParentMessage extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.addChildPost = this.addChildPost.bind(this);
    this.state = {
      isOpen: false,
      childMessage: '',
      postChildren: [],
    }
  }

  componentDidMount() {
    const { thread } = this.props;

    this.setState({
      postChildren: thread.children,
    })
  }

  // toggle dropdown text area
  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    })
  }

  addChildPost(e) {
    const { thread, currentUser, groupId } = this.props;
    const { childMessage, postChildren } = this.state;

    e.target.innerHTML = 'Sent!';

    this.setState({
      childMessage: '',
    })

    axios.post(`/api/groups/${thread.parent.group_id}/forum-reply`, {
      "group_id": groupId,
      "user_id": currentUser.user_id,
      "forum_post_id": `${thread.parent.forum_post_id}`,
      "message": childMessage,
    })
      .then((result) => {
        console.log('result', result);
        var arr = postChildren;
        arr.push(result.data);
        this.setState({
          postChildren: arr,
        })
      })
    this.toggle();
  }

  render() {
    const { thread, groupId, currentUser, user } = this.props;
    const { childMessage, isOpen, postChildren } = this.state;
    const date = moment(thread.parent.posted).format("MMMM Do h:mm a");

    return (
      <div className="forum-parent-message-container">
        <Container>
          <Row>
            <Col>
              {/* Parent forum post */}
              <Card className="forum-parent-card">
                <CardBody>
                  <div className="forum-card-header-section">
                    <CardTitle tag="h5" className="forum-card-title">{thread.parent.author.first_name} {thread.parent.author.last_name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{date}</CardSubtitle>
                  </div>
                  <CardText>{thread.parent.message}</CardText>
                  <Button className="forum-reply-button" outline color="secondary" onClick={this.toggle}>Reply</Button>
                </CardBody>
              </Card>
              {/* Reply dropdown section */}
              <Collapse isOpen={isOpen}>
                <Form>
                  <Container>
                    <Row>
                      <Col xs="11">
                        <FormGroup className="forum-reply-area">
                          <Input className="forum-reply-textbox" value={childMessage} type="textarea" name="text" placeholder="Reply.." onChange={(e) => { this.setState({ childMessage: e.target.value }) }} />
                        </FormGroup>
                      </Col>
                      <Col xs="1">
                        {/* adding a child forum post */}
                        <Button className="forum-send-button" onClick={this.addChildPost}>Send</Button>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Collapse>
            </Col>
          </Row>
          {/* Children reply posts to the parent */}
          {postChildren.map((child) => (
            <ChildMessage key={child.reply_id} child={child} />
          ))}
        </Container>
      </div>
    )
  }
}

export default ParentMessage;
