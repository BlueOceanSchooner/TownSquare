import React, { Component } from 'react';
import axios from 'axios';

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attending: 1
    }
    this.updateRSVP = this.updateRSVP.bind(this);
  }

  componentDidMount() {
    const { event, userID } = this.props;
    axios.get(`/api/events/${event.event_id}/attendees`)
      .then((results) => {
        for (let i = 0; i < results.data.length; i += 1) {
          if (userID === results.data[i].user_id) {
            this.setState({
              attending: results.data[i].attending
            });
            break;
          }
        }
      })
      .catch((err) => console.log(err));
  }

  updateRSVP() {
    const { event, userID } = this.props;
    let { attending } = this.state;
    attending = attending === 1 ? 0 : 1;
    axios.post(`/api/events/${event.event_id}/attendees`, {
      user_id: userID,
      attending
    })
      .then(() => {
        axios.get(`/api/events/${event.event_id}/attendees`)
          .then((results) => {
            for (let i = 0; i < results.data.length; i += 1) {
              if (userID === results.data[i].user_id) {
                this.setState({
                  attending: results.data[i].attending
                }, () => {
                  console.log('SECOND API CALL MADE!');
                });
                break;
              }
            }
          });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { event, updateSelectedEvent, userID } = this.props;
    const { attending } = this.state;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(event.time);
    const hour = `${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
    date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    return (
      <div className="row border border-dark m-2">
        <div onClick={() => updateSelectedEvent(event)} className="col-9 p-2" style={{minHeight: "6em", cursor: 'pointer'}}>
          <h5>{event.title} <span className="badge badge-pill badge-info">{event.group.group_name}</span></h5>
          <p className="text-justify mb-0">{event.description}</p>
        </div>
        <div className="col-3 border-left border-dark p-2" style={{minHeight: "6em"}}>
          <p className="text-center mb-0">{date}</p>
          <p className="text-center mt-0 mb-0">{hour}</p>
          <div className="row justify-content-center">
            {attending === 1 ? (
              <button type="button" className="btn btn-sm btn-success" onClick={this.updateRSVP}>Attending</button>
            ) : (
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.updateRSVP}>Attend</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EventItem;