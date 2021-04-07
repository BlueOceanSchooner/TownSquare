import React, { Component, Fragment } from 'react';
import axios from 'axios';
import GroupCarousel from './GroupCarousel.jsx';
import Events from './Events.jsx';
import Announcements from './Announcements.jsx';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      events: [],
      announcements: []
    };
  }

  componentDidMount() {
    console.log('USER ID: ',  this.props.userID);
    axios.get(`/api/users/${this.props.userID}/groups`)
      .then((results) => {
        const groups = results.data;
        axios.get(`/api/users/${this.props.userID}/events`)
          .then((res) => {
            const events = res.data;
            let announcements = [];
            groups.forEach((g) => {
              axios.get(`/api/groups/${g.group_id}/posts`)
                .then((r) => {
                  if (r.data.length > 0) {
                    announcements = [...announcements, ...r.data];
                    this.setState({
                      groups,
                      events,
                      announcements
                    });
                  }
                });
            });
          });
      })
      .catch(err => console.log('error:', err));
  }

  render() {
    const { events, announcements, groups } = this.state;
    return (
      <div className="container">
        <GroupCarousel />
        <div className="row">
          <Events events={events} />
          <Announcements announcements={announcements} groups={groups}/>
        </div>
      </div>
    );
  }
}

export default Homepage;