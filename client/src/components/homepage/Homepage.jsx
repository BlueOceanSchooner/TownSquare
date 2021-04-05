import React, { Component, Fragment } from 'react';
import GroupCarousel from './GroupCarousel.jsx';
import Events from './Events.jsx';
import Announcements from './Announcements.jsx';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <GroupCarousel />
        <div className="row">
          <Events />
          <Announcements />
        </div>
      </div>
    );
  }
}

export default Homepage;