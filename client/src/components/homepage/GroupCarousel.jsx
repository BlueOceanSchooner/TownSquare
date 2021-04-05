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
      <div className="row mb-3 mt-3">
        <div className="col-12 text-center text-white bg-primary pt-2">
          <h5>MY GROUPS</h5>
        </div>
          <GroupItem />
          <GroupItem />
          <GroupItem />
          <GroupItem />
          <GroupItem />
          <GroupItem />
      </div>
    );
  }
}

export default GroupCarousel;