import React from 'react';

const Member = ({ name, id, onClick, userID, style }) => {
  if (Number(id) === Number(userID)) {
    return (
      <div style={style ?? null}>
        You
      </div>
    );
  }
  return (
    <div style={style ?? null} name={id} onClick={onClick} className={'message-member'}>
      {name}
    </div>
  );
};

export default Member;
