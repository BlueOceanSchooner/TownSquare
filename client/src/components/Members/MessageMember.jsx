import React from 'react';

const Member = ({ name, id, onClick, userID }) => {
  if (Number(id) === Number(userID)) {
    return (
      <div>
        {name}
      </div>
    );
  }
  return (
    <div name={id} onClick={onClick} className={'message-member'}>
      {name}
    </div>
  );
};

export default Member;
