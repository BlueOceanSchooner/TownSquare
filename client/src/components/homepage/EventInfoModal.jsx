import React, { Component } from 'react';
import MessageMember from '../Members/MessageMember.jsx';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CalendarButton from '../Calendar/CalendarButton.jsx';

var Map;

class EventInfoModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        attendees: null,
        mapReady: false,
        attending: 1
      };
    this.updateRSVP = this.updateRSVP.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.event.event_id}/attendees`)
      .then((res) => {
        let attending = 1;
        for (let i = 0; i < res.data.length; i += 1) {
          if (this.props.userID === res.data[i].user_id) {
            attending = res.data[i].attending;
            break;
          }
        }
        this.setState({
          attendees: res.data,
          attending
        });
      })
      .catch((err) => console.log(err));
    axios.get(`/api/maps`)
      .then((res) => {
        console.log(res);
        if (res && res.data && res.data.key) {
          const API_KEY = res.data.key;
          Map = new ReactMapboxGl({
            accessToken: API_KEY,
          });
          this.setState({
            mapReady: true
          });
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
                });
                break;
              }
            }
          });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { event, isModalOpen, toggleModal, chatOnClick, userID } = this.props;
    const { attendees, attending } = this.state;
    const coords = [event.coords.lat, event.coords.long];
    console.log('coords', coords);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(event.time);
    const hour = `${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
    date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    const attendeeNames = [];
    let keyCount = 0;
    if (attendees !== null) {
      attendees.forEach((a) => {
        if (a.attending === 1) {
          const name = `${a.first_name} ${a.last_name}`;
          attendeeNames.push((
            <MessageMember key={keyCount++} onClick={chatOnClick} id={a.user_id} name={name} userID={userID} />
          ));
        }
      });
    }

    return (
      <Modal isOpen={isModalOpen} toggle={toggleModal} style={{maxWidth: "60vw"}}>
        <ModalHeader toggle={toggleModal}>
          {event.title}
          {attending === 1 ? (
            <button type="button" className="btn btn-sm btn-success ml-3" onClick={this.updateRSVP}>Attending</button>
          ) : (
            <button type="button" className="btn btn-sm btn-secondary ml-3" onClick={this.updateRSVP}>Not Attending</button>
          )}
          <CalendarButton event={this.props.event} />
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-6">
              <h3>{event.description}</h3>
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
              <div>
                <div className="font-weight-bold">MEMBERS ATTENDING:</div>
                {(attendees !== null && attendeeNames.length > 0) && attendeeNames}
              </div>
            </div>
            <div className="col-6">
              { this.state.mapReady &&
              <div>
                <Map
                  style="mapbox://styles/mapbox/streets-v9"
                  center={[event.coords.long, event.coords.lat]}
                  containerStyle={{
                    height: '25vw',
                    width: '25vw',
                  }}
                >
                  <Marker
                    coordinates={[event.coords.long, event.coords.lat]}
                    anchor="bottom">
                      <i style={{color: 'red', fontSize: '2em'}} className="fas fa-map-marker-alt"></i>
                  </Marker>
                </Map>
              </div> }
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default EventInfoModal;