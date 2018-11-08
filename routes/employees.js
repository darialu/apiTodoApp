const uuid = require('uuid/v1')
const moment = require('moment');
const {
  addToken,
  getEmployees,
  addEmployee,
  getEmployee,
  removeEmployee,
  getPositionById,
  getLocationById,
  changeEmployee,
  getEmployeeProjects
} = require('../model.js');

module.exports = app => {
  app.get('/employees', (req, res) =>
    res.send(getEmployees())
  );

  app.post('/employees', (req, res) => {
      const {
        positionId,
        locationId,
        ...employeeData
      } = req.body;
      const id = uuid();

      addEmployee({
        ...employeeData,
        position: getPositionById(positionId),
        positionId,
        location: getLocationById(locationId),
        locationId,
        id
      });
      res.send(getEmployee(id));
  });

  app.delete('/employees/:id', (req, res) => {
      const { id } = req.params;

      removeEmployee(id);
      res.send(getEmployees());
  });

  app.put('/employees/:id', (req, res) => {
      const { id } = req.params;
      const { positionId, locationId, ...employeeData } = req.body;
      console.log('serverLocId', locationId, 'positionId', positionId);

      changeEmployee({ 
        ...employeeData,
        position: getPositionById(positionId),
        positionId,
        location: getLocationById(locationId),
        locationId,
        id
      });
      res.send(getEmployees());
  });

  app.get('/employees/:id', (req, res) => {
    const { id } = req.params;

    res.send(getEmployee(id));
  });

  app.get('/employees/:id/projects', (req, res) => {
    const { id } = req.params;

    res.send(getEmployeeProjects(id));
  });

//sign up method
  app.post('/signUp', (req, res) => {

    const signUpData  = req.body;
    console.log('req.body', req.body);
    console.log('signUpData', signUpData);

    //verification
    if (!signUpData || !signUpData.password || !signUpData.email) {
      res.status(400);
      console.log('signUpData 400 error. Password or email is undefined ', signUpData);

      res.send({ error: 'Please, enter email & password' });
      return;
    }

    const { email } = signUpData;

    const employees = getEmployees();
    const foundUser = employees
      .find(employee => employee.email === email);

    if (foundUser) {
      res.status(403);
      res.send({ error: 'user already exists' });
      return;
    }

    const id = uuid();

    addEmployee({
      ...signUpData,
      name: "New",
      avatar: "",
      birthday: "1995-04-23T18:25:43.511Z",
      surName: "Employee",
      positionId: "0",
      position: {
        id: "0",
        name: "PM"
      },
      locationId: "4",
      location: {
        id: "4",
        name: "London"
      },
      skills: [],
      id
    });

    const newUser = employees
    .find(employee => employee.email === email);

    const token = uuid(signUpData.email);

    const expirationDate = moment().add(7, 'days').utc().unix();

    addToken({ token, expirationDate, userId: id });

    // console.log('sign up working');

    res.status(200);
    res.send({
      token,
      user: newUser
    });
    
});

}
