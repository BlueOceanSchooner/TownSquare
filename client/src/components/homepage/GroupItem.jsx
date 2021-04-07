import React from 'react';

const GroupItem = ({ group }) => {
  return (
    <div className="col-3" style={{cursor: 'pointer'}}>
      <div className="card border border-dark mt-3 position-relative">
        <img className="card-img-top" src="https://cms.qz.com/wp-content/uploads/2016/07/rtx2c9ws.jpg?quality=75&strip=all&w=1200&h=900&crop=1" alt="person laughing" />
        <div className="card-body pt-0">
          <h5 className="card-title text-center pt-1" style={{height: '2em', fontSize: '1.2em'}}>{group.group_name}</h5>
        </div>
        <div className="badge badge-pill badge-info position-absolute fixed-top w-25" style={{top: "5px", left: "5px"}}>Owner</div>
      </div>
    </div>
  );
};

export default GroupItem;
