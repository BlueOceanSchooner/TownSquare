import React from 'react';
import { Link } from 'react-router-dom';

const GroupItem = ({ group }) => {
  return (
    <div className="col-3" style={{cursor: 'pointer'}}>
      <Link to={`/groups/${group.group_id}`}>
        <div className="card border border-dark mt-3 position-relative">
          <img className="card-img-top" src={group.image_url} alt="person laughing" />
          <div className="card-body pt-0">
            <h5 className="card-title text-center pt-1" style={{height: '2em', fontSize: '1.2em'}}>{group.group_name}</h5>
          </div>
          <div className="badge badge-pill badge-info position-absolute fixed-top w-25" style={{top: "5px", left: "5px"}}>Owner</div>
        </div>
      </Link>
    </div>
  );
}

export default GroupItem;
