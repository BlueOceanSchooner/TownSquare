import React from 'react';

const Member = ({ name, id, onClick }) => {
  return (
    <div name={id} onClick={onClick}>
      {name}
    </div>
  );
}

export default Member;
