const uuid = require('uuid/v1')
const {
  getProjects,
  getProject,
  removeProject,
  addProject,
  changeProject,
  getProjectEmployees
} = require('../model.js');
const moment = require('moment');

module.exports = app => {
  app.get('/projects', (req, res) =>
    res.send(getProjects())
  );

  // app.post('/projects', (req, res) => {
  //     const { body: project } = req;
  //     // const { ...project } = req.body;
  //     const id = uuid();

  //     addProject({
  //       ...project,
  //       creationDate: moment().toJSON(),
  //       id
  //     });
  //     res.send(getProject(id));
  // });

  app.post('/projects', (req, res) => {
    const { ...project } = req.body;
    const id = uuid();

    addProject({
      ...project,
      creationDate: moment().toJSON(),
      id
    });
    res.send(getProject(id));
});

  app.delete('/projects/:id', (req, res) => {
      const { id } = req.params;

      removeProject(id);
      res.send(getProjects());
  });

  app.put('/projects/:id', (req, res) => {
      const { id } = req.params;
      const { body: project } = req;

      changeProject({ ...project, id });
      res.send(getProjects());
  });

  app.get('/projects/:id/employees', (req, res) => {
      const { id } = req.params;
      const project = getProject(id);

      if (!project) {
        res.status(400).send({ status: 'Project not found' });
        return;
      }

      res.send(getProjectEmployees(project.employees));
  });
}
