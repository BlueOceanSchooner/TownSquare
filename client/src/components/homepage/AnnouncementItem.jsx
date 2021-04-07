import React from 'react';

const AnnouncementItem = ({ announcement, groups }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let date = new Date(announcement.created_at);
  const hour = `${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
  date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  let groupName = '';
  for (let i = 0; i < groups.length; i += 1) {
    if (groups[i].group_id === announcement.group_id) {
      groupName = groups[i].group_name;
      break;
    }
  }

  console.log('announcement: ', announcement);
  return (
    <div className="row border border-dark m-2 p-2" style={{height: "fit-content"}}>
      <h5 className="w-100">{groupName} <span className="float-right" style={{fontSize: "0.75em"}}>{date} @ {hour}</span></h5>
      <p className="text-justify mb-0">{announcement.body}</p>
    </div>
  );
};

export default AnnouncementItem;