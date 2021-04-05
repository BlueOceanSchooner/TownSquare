import React from 'react';
import GroupInfo from './GroupInfo';

class Main extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container">
        {/* Group Info */}
        <div className="row">
          <div className="col-12">
            <GroupInfo />
          </div>
        </div>
        <div className="row">
          {/* Upcoming Events */}
          <div className="col">
            Upcoming Events
          </div>
          {/* Announcements / Community Forum */}
          <div className="col">
            Announcements / Community Forum
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
