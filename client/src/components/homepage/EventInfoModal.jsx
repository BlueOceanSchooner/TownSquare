import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

class EventInfoModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        attendees: null
      };
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.event.event_id}/attendees`)
      .then((results) => {
        this.setState({
          attendees: results.data
        });
      })
      .catch((err) => console.log(err));
  }


  render() {
    const { event, isModalOpen, toggleModal } = this.props;
    const { attendees } = this.state;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(event.time);
    const hour = `${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
    date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    const attendeeNames = [];
    if (attendees !== null) {
      attendees.forEach((a) => {
        if (a.attending === 1) {
          attendeeNames.push((
            <div>{a.first_name} {a.last_name}</div>
          ));
        }
      });
    }

    return (
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {event.title}
          <button type="button" className="btn btn-sm btn-success ml-3">Attending</button>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col">
              {event.description}
              <ul>
                <li className="font-weight-bold">LOCATION:{<br></br>}
                  <span className="font-weight-normal">
                    {event.address_1 && event.address_1}{(event.address_1 && event.address_2) && ', '}
                    {event.address_2 && event.address_2}
                  </span>
                </li>
                <li className="font-weight-bold">DATE: <span className="font-weight-normal">{date}</span></li>
                <li className="font-weight-bold">TIME: <span className="font-weight-normal">{hour}</span></li>
              </ul>
            </div>
            <div className="col">[MAP]</div>
          </div>
          <div className="row">
            <div className="col">
              <div className="font-weight-bold">MEMBERS ATTENDING:</div>
              {(attendees !== null && attendeeNames.length > 0) && attendeeNames}
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default EventInfoModal;