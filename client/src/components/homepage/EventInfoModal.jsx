import React, { Component } from 'react';
import MessageMember from '../Members/MessageMember.jsx';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// const Map = new ReactMapboxGl({
//   accessToken: ''
// });

var Map;

class EventInfoModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        attendees: null,
        mapReady: false
      };
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.event.event_id}/attendees`)
      .then((res) => {
        this.setState({
          attendees: res.data
        });
      })
    .catch((err) => console.log(err));

    axios.get(`/api/maps`)
      .then((res) => {
        console.log(res);
        if (res && res.data && res.data.key) {
          const API_KEY = res.data.key;
          Map = new ReactMapboxGl({
            accessToken: API_KEY
          });
          this.setState({
            mapReady: true
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { event, isModalOpen, toggleModal, chatOnClick, userID } = this.props;
    const { attendees } = this.state;
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
          <button type="button" className="btn btn-sm btn-success ml-3">Attending</button>
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
                  centerPosition={{latitude: event.coords.lat, longitude: event.coords.long}}
                  containerStyle={{
                    height: '25vw',
                    width: '25vw',
                  }}
                >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={coords} />
                  </Layer>
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