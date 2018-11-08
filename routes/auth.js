const { sha1 } = require('../utils');
const uuid = require('uuid');
const moment = require('moment');
const { addToken, getEmployees } = require('../model');

module.exports = app => {
  app.post('/auth', (req, res) => {
    // console.log(req.body);
    const { body: authData } = req;
    // console.log('authData ', authData);
    // console.dir(myObject, { depth: null });

    if (!authData || !authData.password || !authData.email) {
      res.status(401);
      console.log('authData 401error ', authData);

      res.send({ error: 'Please, specify email & password' });
      return;
    }

    const { password, email } = authData;

    const employees = getEmployees();
    // console.log('employees are ', employees);
    const foundUser = employees
      .find(employee => employee.email === email);

    if (!foundUser) {
      res.status(401);
      res.send({ error: 'User not found' });
      return;
    }

    const doesPasswordEqual = sha1(String(password))
      === sha1(String(foundUser.password))
    // console.log('foundUser.password', foundUser.password);
    // console.log('password', password);
    // console.log('sha1(String(password)', sha1(String(password)));


    if (!doesPasswordEqual) {
      res.status(401);
      res.send({ error: 'Wrong password' });
      return;
    }

    const token = uuid(foundUser.email);
    const expirationDate = moment().add(7, 'days').utc().unix();

    addToken({ token, expirationDate, userId: foundUser.id });

    res.status(200);
    res.send({
      token,
      user: foundUser
    });
    return;
  });

}
