import React from 'react';
import AnnouncementsItem from './AnnouncementsItem';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

class AnnouncementsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <ListGroup>
          {posts.map((post) => (
            <AnnouncementsItem key={post.post_id} post={post} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default AnnouncementsList;
