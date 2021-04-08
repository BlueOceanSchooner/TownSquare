
const getMapsKey = (req, res) => {
  const MAPS_KEY = process.env.MAPS_KEY;

  return res.json({
    key: MAPS_KEY
  });

}

module.exports = {
  getMapsKey
};
