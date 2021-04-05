import React from 'react';

const AnnouncementItem = () => {
  return (
    <div className="row border border-dark m-2 p-2" style={{height: "6em"}}>
      <h5 className="w-100">Group name <span className="float-right" style={{fontSize: "0.75em"}}>April 1, 2021 @ 4:45 PM ET</span></h5>
      <p className="text-justify">Darryl's a little down this week, so the group is going to break into his house and surprise him tomorrow night.</p>
    </div>
  );
};

export default AnnouncementItem;