import React from 'react';
import EventsList from './EventsComponents/EventsList';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Announcements extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { events } = this.props;
    return (
      <div className="activities-container">
        <Tabs selectedTabClassName="group-tab-selected">
          <TabList className="tab-list-container">
            <Tab className="tab-name">Upcoming Events</Tab>
            <Tab className="tab-name">Announcements</Tab>
            <Tab className="tab-name">Community Forum</Tab>
          </TabList>

          <TabPanel>
            <EventsList events={events} />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Announcements;
