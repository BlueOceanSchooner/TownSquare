import React, { Component } from 'react';
import GroupItem from './GroupItem.jsx';

class GroupCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPage: 0
    };
    this.pageRight = this.pageRight.bind(this);
    this.pageLeft = this.pageLeft.bind(this);
  }

  pageRight(totalGroups) {
    const { groupPage } = this.state;
    if (totalGroups - groupPage === 1) {
      this.setState({
        groupPage: 0
      });
    } else {
      this.setState({
        groupPage: groupPage + 1
      });
    }
  }

  pageLeft(totalGroups) {
    const { groupPage } = this.state;
    if (totalGroups + groupPage === 1) {
      this.setState({
        groupPage: 0
      });
    } else {
      this.setState({
        groupPage: groupPage - 1
      });
    }
  }

  render() {

    const { groups, userID } = this.props;
    const { groupPage } = this.state;

    let allGroupItems = [];
    let keyCount = 0;
    groups.forEach((g) => {
      allGroupItems.push((
        <GroupItem key={keyCount++} group={g} userID={userID} />
      ));
    });

    let groupItems = [...allGroupItems.slice(groupPage), ...allGroupItems.slice(0)];
    groupItems = groupItems.slice(0, 4);

    return (
      <div className="row mb-3 mt-3">
        <div className="col-12 text-center text-white bg-secondary rounded-pill pt-2">
          <h5>MY GROUPS</h5>
        </div>
        <div className="row justify-content-md-center position-relative">
          {groupItems.length > 0 && groupItems}
          {allGroupItems.length > 4 && <i onClick={() => this.pageLeft(allGroupItems.length)} className="fa fa-chevron-left position-absolute" style={{left: '0', top: '50%', fontSize: '2em', marginLeft: '-1em', cursor: 'pointer'}}aria-hidden="true"></i>}
          {allGroupItems.length > 4 && <i onClick={() => this.pageRight(allGroupItems.length)} className="fa fa-chevron-right position-absolute" style={{right: '0', top: '50%', fontSize: '2em', marginRight: '-1em', cursor: 'pointer'}}aria-hidden="true"></i>}
        </div>
      </div>
    );
  }
}

export default GroupCarousel;