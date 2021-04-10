import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';


const CalendarButton = (props) => {

  const handleAddEvent = () => {
    let locale = [props.event.address_1, props.event.address_2, props.event.city, props.event.state, props.event.zipcode].join(' ');
    let event = {
      summary: props.event.title,
      location: locale,
      description: props.event.description,
      dateTime: props.event.time
    }
    axios.post('/calendar', event)
      .then(() => console.log('success!'))
      .catch((err) => console.log(err));
  }

  return (
    <Button className="btn btn-sm btn-success ml-3" onClick={handleAddEvent}>
      Add To Calendar
    </Button>
  )
}

export default CalendarButton;