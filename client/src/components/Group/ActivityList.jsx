import React from 'react';
import EventsList from './EventsComponents/EventsList';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Container, Row, Col } from 'reactstrap';

class Announcements extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="activities-container">
        <Tabs selectedTabClassName="group-tab-selected">
          <TabList className="tab-list-container">
            <Tab className="tab-name">Upcoming Events</Tab>
            <Tab className="tab-name">Announcements</Tab>
            <Tab className="tab-name">Community Forum</Tab>
          </TabList>

          <TabPanel>
            <EventsList />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>

        {/* <CardHeader>
          <span className="group-tab-header">Upcoming Events</span>
          <span className="group-tab-header">|</span>
          <span className="group-tab-header">Announcements</span>
          <span className="group-tab-header">|</span>
          <span className="group-tab-header">Community Forum</span>
        </CardHeader> */}
      </div>
    );
  }
}

export default Announcements;
