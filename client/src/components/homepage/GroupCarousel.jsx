import React, { Component } from 'react';
import GroupItem from './GroupItem.jsx';

class GroupCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <div className="w-100 text-center text-white font-weight-bold bg-primary">MY GROUPS</div>
        <GroupItem />
        <GroupItem />
      </div>
    );
  }
}

export default GroupCarousel;