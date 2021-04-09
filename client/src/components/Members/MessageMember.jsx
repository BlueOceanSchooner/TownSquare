import React from 'react';

const Member = ({ name, id, onClick, userID, style }) => {
  console.log(userID);
  if (Number(id) === Number(userID)) {
    return (
      <div style={style ?? null}>
        You
      </div>
    );
  }
  if (!userID) {
    return (
      <div style={style ?? null}>
        {name}
      </div>
    )
  }
  return (
    <div style={style ?? null} name={id} onClick={onClick} className={'message-member'}>
      {name}
    </div>
  );
};

export default Member;
