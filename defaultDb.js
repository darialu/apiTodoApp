module.exports = db =>
  db
    .defaults({
      employees: [{
        id: '0',
        name: 'Andy',
        avatar: '',
        email: 'andy_wallcroft@mail.uk',
        birthday: '1995-04-23T18:25:43.511Z',
        password: '12345',
        surName: 'Wallcroft',
        positionId: '0',
        position: {
          id: '0',
          name: 'PM'
        },
        locationId: '4',
        location: {
          id: '4',
          name: 'London'
        }
      }],
      projects: [{
        id: '0',
        employees: ['0'],
        creationDate: '2018-06-22T18:25:43.511Z',
        name: 'Warner Music Group',
        description: 'New UI for the company\'s managers'
      }],
      tasks: [{
        id: '0',
        employeeId: '0',
        projectId: '0',
        projectName: 'Warner Music Group',
        name: 'Fix bug on UI',
        description: ''
      }],
      authSessions: [{
        userId: '0',
        token: '3343-23g2-3243',
        expirationDate: 2529487993212
      }],
      locations: [{
        id: '0',
        name: 'New York'
      }, {
        id: '1',
        name: 'Kyiv'
      }, {
        id: '2',
        name: 'Warsaw'
      }, {
        id: '3',
        name: 'Berlin'
      }, {
        id: '4',
        name: 'London'
      }, {
        id: '5',
        name: 'Moscow'
      }, {
        id: '6',
        name: 'Lviv'
      }, {
        id: '7',
        name: 'Kherson'
      }, {
        id: '8',
        name: 'Kharkiv'
      }, {
        id: '9',
        name: 'Odessa'
      }, {
        id: '10',
        name: 'Dnipro'
      }],
      skillLevels: [{
        id: '0',
        name: 'Unknown'
      },{
        id: '1',
        name: 'Trainee'
      },{
        id: '2',
        name: 'Junior'
      },{
        id: '3',
        name: 'Strong Junior'
      },{
        id: '4',
        name: 'Middle'
      },{
        id: '5',
        name: 'Strong Middle'
      },{
        id: '6',
        name: 'Senior'
      },{
        id: '7',
        name: 'Expert'
      }],
      skills: [{
        id: '0',
        name: 'JS'
      },{
        id: '1',
        name: '.NET'
      },{
        id: '2',
        name: 'PHP'
      },{
        id: '3',
        name: 'JAVA'
      },{
        id: '4',
        name: 'Webmastering'
      },{
        id: '5',
        name: 'Python'
      },{
        id: '6',
        name: 'QA'
      },{
        id: '7',
        name: 'Project management'
      }],
      positions: [{
        id: '0',
        name: 'PM'
      },{
        id: '1',
        name: 'Developer'
      },{
        id: '2',
        name: 'QA'
      },{
        id: '3',
        name: 'Solution Architect'
      }]
    })
    .write()
