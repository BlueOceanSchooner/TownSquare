import React, { Component, Fragment } from 'react';
import AnnouncementItem from './AnnouncementItem.jsx';

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Fragment>
        <div>Announcements</div>
        <AnnouncementItem />
        <AnnouncementItem />
      </Fragment>
    );
  }
}

export default Announcements;