import React from 'react';
import EventsList from './EventsComponents/EventsList';
import AnnouncementsList from './AnnouncementsComponents/AnnouncementsList';
import Forum from './ForumComponents/Forum';
import CreateEventModal from '../Events/CreateEventModal.jsx';

import { Button } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Announcements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    const { events, posts, forum, groupId, currentUser, user, groupInfo } = this.props;
    return (
      <div className="activities-container">
        <CreateEventModal group={groupInfo} isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal.bind(this)} />
        <Tabs selectedTabClassName="group-tab-selected">
          <TabList className="tab-list-container">
            <Tab className="tab-name">
              Upcoming Events
              {!groupInfo.owner || groupInfo.owner.user_id !== currentUser.user_id ? '' : <Button onClick={this.toggleModal.bind(this)} className="add-event-button">+</Button>}

            </Tab>
            <Tab className="tab-name">Announcements</Tab>
            <Tab className="tab-name">Community Forum</Tab>
          </TabList>

          <TabPanel>
            <EventsList events={events} groupInfo={groupInfo} />
          </TabPanel>
          <TabPanel>
            <AnnouncementsList posts={posts} groupInfo={groupInfo} currentUser={currentUser}/>
          </TabPanel>
          <TabPanel>
            <Forum forum={forum} groupId={groupId} currentUser={currentUser} user={user} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Announcements;
