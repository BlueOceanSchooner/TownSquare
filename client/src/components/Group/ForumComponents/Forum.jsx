import React from 'react';
import axios from 'axios';
import ParentMessage from './ParentMessage';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col, Form, FormGroup, Label, Input
} from 'reactstrap';

class Forum extends React.Component {
  constructor(props) {
    super(props);

    this.addForumPost = this.addForumPost.bind(this);
    this.state = {
      newForumPostText: '',
    }
  }

  addForumPost() {
    const { newForumPostText } = this.state;
    const { groupInfo, currentUser } = this.props;

    console.log('forum post submitted!', newForumPostText);
    axios.post(`/api/groups/${groupInfo.group_id}/forum`, {
      "group_id": groupInfo.group_id,
      "user_id": currentUser.user_id,
      "message": newForumPostText,
    })
  }

  render() {
    const { forum, groupId, currentUser, user } = this.props;
    return (
      <div className="forum-container">
        <Container>
          <Form>
            <Card className="forum-new-post-section">
              <CardBody>
                <FormGroup>
                  <Label>Message</Label>
                  <Input type="textarea" name="text" onChange={(e) => {this.setState({newForumPostText: e.target.value})}}></Input>
                </FormGroup>
                <Button onClick={this.addForumPost}>Send</Button>
              </CardBody>
            </Card>
          </Form>
        </Container>

        {forum.map((thread) => (
          <ParentMessage key={thread.parent.forum_post_id} thread={thread} groupId={groupId} currentUser={currentUser} user={user} />
        ))}
      </div>
    );
  }
}

export default Forum;
