const setEmployeesRequests = require('./employees');
const setProjectsRequests = require('./projects');
const setAuthRequests = require('./auth');
const setTasksRequests = require('./tasks');
const setCommonRequests = require('./common');

module.exports = app => {
  setCommonRequests(app);
  setAuthRequests(app);
  setTasksRequests(app);
  setEmployeesRequests(app);
  setProjectsRequests(app);
}
