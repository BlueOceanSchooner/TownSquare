import React from 'react';
import EventsList from './EventsComponents/EventsList';
import AnnouncementsList from './AnnouncementsComponents/AnnouncementsList';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Announcements extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { events, posts } = this.props;
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
            <AnnouncementsList posts={posts} />
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
