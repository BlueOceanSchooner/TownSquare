import React from 'react';
import axios from 'axios';
import AnnouncementsItem from './AnnouncementsItem';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col, Form, FormGroup, Label, Input
} from 'reactstrap';

class AnnouncementsList extends React.Component {
  constructor(props) {
    super(props);

    this.addAnnouncement = this.addAnnouncement.bind(this);
    this.state = {
      announcementTitle: '',
      announcementBody: '',
    }
  }

  addAnnouncement() {
    const { announcementTitle, announcementBody } = this.state;
    const { groupInfo, currentUser } = this.props;

    console.log('announcement added!');
    console.log(announcementTitle);
    console.log(announcementBody);
    console.log(currentUser);
    axios.post(`/api/groups/${groupInfo.group_id}/posts`, {
      "title": announcementTitle,
      "user_id": currentUser.user_id,
      "body": announcementBody,
    })
  }

  render() {
    const { posts, groupInfo, currentUser } = this.props;
    return (
      <div className="announcements-container">

        {/* Checking if current user is the group owner */}
        {!groupInfo.owner || groupInfo.owner.user_id !== currentUser.user_id ? '' :
          // Form container for the group owner to add an announcement
          <Container className="group-new-announcement-section">
            <Form>
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label>Title</Label>
                    <Input type="textarea" name="text" id="announcement-title-textbox" onChange={(e) => { this.setState({ announcementTitle: e.target.value }) }}></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Announcement</Label>
                    <Input type="textarea" name="text" placeholder="Enter a new announcement for the group!" onChange={(e) => { this.setState({ announcementBody: e.target.value }) }}></Input>
                  </FormGroup>
                  <Button onClick={this.addAnnouncement}>Send</Button>
                </CardBody>
              </Card>
            </Form>
          </Container>
        }

        {/* List of announcements for everyone to see */}
        {posts.map((post) => (
          <AnnouncementsItem key={post.post_id} post={post} />
        ))}
      </div >
    );
  }
}

export default AnnouncementsList;
