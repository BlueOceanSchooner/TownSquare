import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const GroupInfo = () => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="https://superiorhiking.org/wp-content/uploads/2020/09/SHTA-Homepage_-Castle-Danger.png" alt="Group poster" className="group-poster"/>
        <CardBody>
          <CardTitle tag="h5">North County Hiking</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Joe, Stephen, and 25 others are members</CardSubtitle>
          <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CardText>
          <Button>Join!</Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default GroupInfo;
