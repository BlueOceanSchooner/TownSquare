const connection = require('../../db/connection.js');

const login = (req, res) => {
  console.log("-------req.user-----------");
  console.log(req.user);
  console.log("-------req.user-----------");

  let returnData = {
    isSuccess: true,
    uer: req.user
  };

  res.send(JSON.stringify(returnData));
};

const signup = (req, res) => {
  console.log("-------req.user-----------");
  console.log(req.user);
  console.log("-------req.user-----------");

  let returnData = {
    isSuccess: true,
    uer: req.user
  };

  res.send(JSON.stringify(returnData));
};

module.exports = {
  login,
  signup
};
