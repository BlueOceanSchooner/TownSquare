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
      orderedPosts: [],
    }
  }

  componentDidMount() {
    const { posts } = this.props;

    this.setState({
      orderedPosts: posts,
    });
  }

  addAnnouncement(e) {
    const { announcementTitle, announcementBody, orderedPosts } = this.state;
    const { groupInfo, currentUser } = this.props;

    e.target.innerHTML = 'Sent!';

    this.setState({
      announcementTitle: '',
      announcementBody: '',
    })

    axios.post(`/api/groups/${groupInfo.group_id}/posts`, {
      "title": announcementTitle,
      "user_id": currentUser.user_id,
      "body": announcementBody,
    })
      .then((result) => {
        var arr = orderedPosts;
        arr.unshift(result.data);
        this.setState({
          orderedPosts: arr,
        })
      })
  }

  render() {
    const { announcementTitle, announcementBody, orderedPosts } = this.state;
    const { posts, groupInfo, currentUser } = this.props;
    return (
      <div className="announcements-container">

        {/* Checking if current user is the group owner */}
        {!groupInfo.owner || groupInfo.owner.user_id !== currentUser.user_id ? '' :
          // Form container for the group owner to add an announcement
          <Container className="group-new-announcement-section">
            <Form>
              <Card>
                <CardBody className="group-new-announcemnet-card">
                  <FormGroup>
                    <Label>Title</Label>
                    <Input value={announcementTitle} type="textarea" name="text" id="announcement-title-textbox" onChange={(e) => { this.setState({ announcementTitle: e.target.value }) }}></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Announcement</Label>
                    <Input value={announcementBody} type="textarea" name="text" placeholder="Enter a new announcement for the group" onChange={(e) => { this.setState({ announcementBody: e.target.value }) }}></Input>
                  </FormGroup>
                  <div className="new-announcement-button-container">
                    <Button className="new-announcement-button" onClick={this.addAnnouncement}>Send</Button>
                  </div>
                </CardBody>
              </Card>
            </Form>
          </Container>
        }

        {/* List of announcements for everyone to see */}
        {orderedPosts.map((post) => (
          <AnnouncementsItem key={post.post_id} post={post} />
        ))}
      </div >
    );
  }
}

export default AnnouncementsList;
