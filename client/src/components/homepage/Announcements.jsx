import React, { Component, Fragment } from 'react';
import AnnouncementItem from './AnnouncementItem.jsx';

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    const { announcements, groups } = this.props;
    const announcementItems = [];
    let keyCount = 0;
    announcements.forEach((a) => {
      announcementItems.push((
        <AnnouncementItem key={keyCount++} announcement={a} groups={groups}/>
      ));
    });

    return (
      <div className="col ml-5">
        <div className="row">
          <div className="col align-self-center text-center text-white bg-secondary rounded-pill pt-2">
            <h5>RECENT ANNOUNCEMENTS</h5>
          </div>
        </div>
        {announcementItems}
      </div>
    );
  }
}

export default Announcements;