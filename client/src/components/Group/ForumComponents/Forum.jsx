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
      orderedForum: [],
    }
  }

  componentDidMount() {
    const { forum } = this.props;

    this.setState({
      orderedForum: forum,
    });
  }

  addForumPost(e) {
    const { newForumPostText, orderedForum } = this.state;
    const { groupInfo, currentUser } = this.props;

    e.target.innerHTML = 'Sent!';

    this.setState({
      newForumPostText: '',
    })

    axios.post(`/api/groups/${groupInfo.group_id}/forum`, {
      "group_id": groupInfo.group_id,
      "user_id": currentUser.user_id,
      "message": newForumPostText,
    })
      .then((result) => {
        var arr = orderedForum;
        arr.unshift(result.data);
        this.setState({
          orderedForum: arr,
        })
      })
  }

  render() {
    const { orderedForum, newForumPostText } = this.state;
    const { forum, groupId, currentUser, user } = this.props;
    return (
      <div className="forum-container">
        <Container>
          <Form>
            <Card className="forum-new-post-section">
              <CardBody className="forum-new-post-card">
                <FormGroup>
                  <Label>Forum Post</Label>
                  <Input value={newForumPostText} type="textarea" name="text" placeholder="Enter a post on the community forum" onChange={(e) => { this.setState({ newForumPostText: e.target.value }) }}></Input>
                </FormGroup>
                <div className="new-forum-post-button-container">
                  <Button className="new-forum-post-button" onClick={this.addForumPost}>Send</Button>
                </div>
              </CardBody>
            </Card>
          </Form>
        </Container>

        {orderedForum.map((thread) => (
          <ParentMessage key={thread.parent.forum_post_id} thread={thread} groupId={groupId} currentUser={currentUser} user={user} />
        ))}
      </div>
    );
  }
}

export default Forum;
