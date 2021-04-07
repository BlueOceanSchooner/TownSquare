import React from 'react';
import ParentMessage from './ParentMessage';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

class Forum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { forum, groupId, userId } = this.props;
    console.log('forum', forum);
    return (
      <div className="forum-container">
        {forum.map((thread) => (
          <ParentMessage key={thread.parent.forum_post_id} thread={thread} groupId={groupId} userId={userId}/>
        ))}
      </div>
    );
  }
}

export default Forum;
