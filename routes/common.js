const {
  getLocations,
  getPositions,
  getSkillLevels,
  getSkills
} = require('../model');

module.exports = app => {
  app.get('/locations', (req, res) => {
    res.send(getLocations());
  });

  app.get('/positions', (req, res) => {
    res.send(getPositions());
  });

  app.get('/skillLevels', (req, res) => {
    res.send(getSkillLevels());
  });

  app.get('/skills', (req, res) => {
    res.send(getSkills());
  });
};
